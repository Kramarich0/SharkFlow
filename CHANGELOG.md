## [Unreleased]

### 🛡️ Security
- Mitigated potential vulnerabilities through cumulative dependency updates across the npm and yarn ecosystem.
- Patched `tar` package to version 7.5.7, resolving issues related to archive extraction logic [[PR-9]], [[PR-7]], [[PR-6]].
- Updated `axios` to version 1.13.5 to address potential HTTP request handling discrepancies [[PR-10]].
- Updated `lodash` to version 4.17.23 to resolve utility function vulnerabilities [[PR-8]].
- Updated `markdown-it` to version 14.1.1 to improve parser security and consistency [[PR-11]].

### ⚙️ Changed
- Synchronized project dependencies via automated updates, consolidating multiple patches for the npm and yarn group [[PR-13]], [[PR-12]], [[PR-4]].
- Upgraded `react-router` from 7.6.2 to 7.12.0 to align with current routing architecture and API standards [[PR-5]].

### 📦 Technical Debt
- Static analysis identified a complexity score of 87, noting that a small subset of files currently drives the majority of the change risk.
- Detected orphan modules within the dependency tree requiring architectural review to prune unused code paths and reduce the overall attack surface.