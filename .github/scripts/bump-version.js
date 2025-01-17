
import semver from "semver";

const KEYWORDS = [
    // Major
    ["major", "major"],
    ["breaking", "major"],
    // Minor
    ["minor", "minor"],
    ["feat", "minor"],
    ["feature", "minor"],
    // Patch
    ["patch", "patch"],
    ["fix", "patch"],
    ["bug", "patch"],
    ["bugfix", "patch"],
    ["perf", "patch"],
]

const prev_version = process.argv[2];
const pr_title = process.argv[3];

let release_type = "prerelease";
for(const [keyword, type] of KEYWORDS) {
    if(pr_title.toLowerCase().includes(`[${keyword}]`)) {
        release_type = type;
        break;
    }
}

const next_version = semver.inc(prev_version, release_type, "beta");

console.log(`version=${next_version}`);
