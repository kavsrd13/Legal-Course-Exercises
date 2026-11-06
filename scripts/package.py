"""Create the distributable source ZIP without Git internals or test output."""
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parents[1]
target = root.parent / 'Legal_Technology_AI_Digital_Assets_Governance_Exercises.zip'
excluded = {'.git', 'node_modules', 'test-results', '__pycache__'}
with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as archive:
    for item in sorted(root.rglob('*')):
        relative = item.relative_to(root)
        if item.is_file() and not any(part in excluded for part in relative.parts):
            archive.write(item, Path(root.name) / relative)
with zipfile.ZipFile(target) as archive:
    if archive.testzip():
        raise RuntimeError('ZIP integrity check failed')
    print(f'{target}\n{len(archive.namelist())} files, {target.stat().st_size:,} bytes; ZIP integrity verified.')
