param([string]$Repository = 'Legal-Course-Exercises')
$ErrorActionPreference = 'Stop'
if ($Repository -notmatch '^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$') { throw 'Use a valid GitHub repository name.' }
Set-Location -LiteralPath $PSScriptRoot
foreach ($command in @('git','gh','node')) { if (-not (Get-Command $command -ErrorAction SilentlyContinue)) { throw "$command is required." } }
node tests/validate.cjs
if ($LASTEXITCODE -ne 0) { throw 'Source validation failed.' }
node --test tests/core.test.cjs
if ($LASTEXITCODE -ne 0) { throw 'Core tests failed.' }
$identityJson = & gh api user 2>&1
if ($LASTEXITCODE -ne 0) { throw 'Cannot reach an authenticated GitHub account. Check network access and gh auth login.' }
$identity = ($identityJson -join "`n") | ConvertFrom-Json
$owner = $identity.login
if (-not $owner) { throw 'GitHub did not return the account login.' }
$repoFull = "$owner/$Repository"
$repoUrl = "https://github.com/$repoFull"
$originUrl = "$repoUrl.git"
$localGit = Test-Path -LiteralPath (Join-Path $PSScriptRoot '.git')
$origin = if ($localGit) { & git remote get-url origin 2>$null } else { '' }
if ($origin -and $origin -ne $originUrl -and $origin -ne $repoUrl) { throw "This checkout points to a different origin: $origin. No remote was changed." }
$repoResult = & gh api "repos/$repoFull" 2>&1
$repoExit = $LASTEXITCODE
if ($repoExit -ne 0) {
  if (($repoResult -join "`n") -notmatch '404') { throw 'Repository lookup failed; no repository was created.' }
  & gh repo create $repoFull --public --description 'Ten guided workshops for Legal Technology, AI, Digital Assets & Governance'
  if ($LASTEXITCODE -ne 0) { throw 'Repository creation failed.' }
} elseif (-not $origin) {
  $repo = ($repoResult -join "`n") | ConvertFrom-Json
  if ($repo.size -gt 0) { throw 'An existing repository with content was found. Use a fresh name or inspect it before attaching this codebase.' }
}
if (-not $localGit) { & git init -b main; if ($LASTEXITCODE -ne 0) { throw 'Git initialisation failed.' } }
if (-not $origin) { & git remote add origin $originUrl; if ($LASTEXITCODE -ne 0) { throw 'Could not set the origin.' } }
$currentBranch = & git branch --show-current
if ($currentBranch -ne 'main') { throw 'Use the main branch for this publishing script. No branch was overwritten.' }
$siteUrl = "https://$owner.github.io/$Repository/"
$slugs = @('ip-audit','licence-negotiation','verified-ai-review','ai-procurement','token-mapping','digital-asset-dd','privacy-dpia','cloud-contract','cyber-tabletop','transformation-capstone')
$linkLines = @('# Student links', '', "Course index: $siteUrl", '', 'Expected links; verify the Pages build before distributing.', '')
for ($i=0; $i -lt $slugs.Count; $i++) { $linkLines += "- Lab $($i+1): $siteUrl#/lab/$($slugs[$i])" }
Set-Content -LiteralPath 'LINKS.md' -Value $linkLines -Encoding utf8
& git add --all
if ($LASTEXITCODE -ne 0) { throw 'Git staging failed.' }
& git diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
  $commitEmail = "$($identity.id)+$owner@users.noreply.github.com"
  & git -c "user.name=$owner" -c "user.email=$commitEmail" commit -m 'Build ten guided legal technology workshops and learning portfolio'
  if ($LASTEXITCODE -ne 0) { throw 'Git commit failed.' }
}
& git push --set-upstream origin main
if ($LASTEXITCODE -ne 0) { throw 'Push failed. No force push was attempted.' }
$pages = & gh api "repos/$repoFull/pages" 2>&1
$pagesExit = $LASTEXITCODE
if ($pagesExit -eq 0) {
  & gh api "repos/$repoFull/pages" --method PUT -f 'build_type=legacy' -f 'source[branch]=main' -f 'source[path]=/' | Out-Null
} elseif (($pages -join "`n") -match '404') {
  & gh api "repos/$repoFull/pages" --method POST -f 'build_type=legacy' -f 'source[branch]=main' -f 'source[path]=/' | Out-Null
} else { throw 'Pages settings could not be read. Repository push completed; Pages activation remains incomplete.' }
if ($LASTEXITCODE -ne 0) { throw 'Pages activation failed. Check the repository Pages settings and account permissions.' }
& gh api "repos/$repoFull/pages/builds" --method POST | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Warning 'An explicit build request failed; inspect the Pages workflow for the push-triggered build.' }
Write-Host "Repository pushed: $repoUrl"
Write-Host "Pages configured. Expected course URL: $siteUrl"
Write-Host "Verify deployment status at $repoUrl/actions before sharing. Actual links are in LINKS.md."
