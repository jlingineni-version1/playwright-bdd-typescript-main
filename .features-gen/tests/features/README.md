# `.features-gen/tests/features/` — baseline snapshots compatibility

Playwright/Cucumber-generated spec files in this project are placed under `.features-gen/` during the test build step. The Playwright snapshot runner expects snapshot files next to those generated specs (in `-snapshots` folders). If visual-regression tests fail saying a snapshot doesn't exist, add the approved baseline image(s) into the matching `-snapshots` folder under this path.

Where to put baseline images
- Example snapshot path reported in CI:
  `.features-gen/tests/features/connectivityToolMap.feature.spec.js-snapshots/Birmingham-connectivity-tool-map-...png`

- To fix missing snapshot errors, commit the baseline PNG into the corresponding folder above. e.g.:
  - `.features-gen/tests/features/connectivityToolMap.feature.spec.js-snapshots/Birmingham-connectivity-tool-map-chromium-win32-chromium-win32-chromium-linux.png`

Commit policy
- Only commit *approved* baseline images to this `.features-gen` folder.
- When updating a baseline, open a PR that replaces the image(s) so reviewers can approve visual changes.

If images are large or numerous
- Enable Git LFS and track image extensions (`*.png`, `*.jpg`) locally before committing. Example:
  ```powershell
  git lfs install
  git lfs track "*.png"
  git lfs track "*.jpg"
  git add .gitattributes
  git commit -m "Track images with Git LFS"
  ```

CI notes
- Keep per-run artifacts out of the repo. Upload per-run screenshots from CI as artifacts (GitHub Actions `actions/upload-artifact`) for debugging.
- Ensure your visual-compare step points at `.features-gen/tests/features/` (the generated spec path) when comparing snapshots.
