# Deploy and share the course

## Prepared target

Repository name: `Legal-Course-Exercises` (created by the course owner).

The publishing script obtains the actual authenticated GitHub account rather than storing a token. It publishes only this source folder, not the original course PDFs or supplied ZIP. The website contains fictional teaching materials.

## Publish from PowerShell

Extract the full package into its own directory. Open a normal PowerShell terminal in that directory and run:

```powershell
.\publish.ps1
```

The script requires Git, GitHub CLI, Node and working network access. If the terminal's execution policy blocks a local script, review the file and follow your organisation's approved process; no security-policy change is required by this project.

It validates the code and core tests, checks the account, creates the course-named public repository if absent, commits and pushes without force, then enables Pages from `main` and `/` (root). If a nonempty repository already exists without a matching local origin, it stops instead of overwriting it. Specify a different unused name if needed:

```powershell
.\publish.ps1 -Repository 'legal-technology-governance-training'
```

## Verify publication

1. Open the repository's **Actions** tab and check that the Pages build/deployment succeeded.
2. Open **Settings → Pages** and use the actual published URL shown there.
3. Open the course index and at least one direct lab link on a student device.
4. Complete a short response, reload, export JSON, restore and export Markdown.
5. Use `LINKS.md`, created by the publishing script, to share the actual lab URLs. Its expected URLs are not proof of successful deployment.

## Manual alternative

Create a new public GitHub repository using the course name. Upload the source folder contents at repository root so `index.html`, `assets/`, `docs/` and `.nojekyll` are in the root. In **Settings → Pages**, choose **Deploy from a branch**, branch **main**, directory **/(root)**, and save. Check the deployment before distributing the URL.

## Release and collection

All ten labs are public once published. Share individual lab links at the appropriate point in class. Link distribution does not lock other labs or hide facilitator themes. If later you require enrolment, timed access, central submissions or a gradebook, those require an additional authenticated service; do not enter credentials into this static site.

Students save locally and submit exported Markdown using the instructor's chosen channel. Include a JSON backup only if your classroom process calls for restoration or continued work.
