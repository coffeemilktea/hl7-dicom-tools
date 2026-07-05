# HL7 / DICOM Tools Workspace

Browser-based tools for working with HL7 v2.x and DICOM medical data standards.
Every HTML tool is single-file and zero-dependency — open it in a browser and go;
no build step, no server, and no data leaves your browser.

A curated set of these tools is published at **[ocha.dev](https://ocha.dev)**
("Healthcare Data Tools"), served from [`pages-repo/`](pages-repo/).

## Tools

| File | Title | What it does | Preview |
|------|-------|--------------|---------|
| [`tools/msgparser.html`](tools/msgparser.html) | HL7 v2 Parser | Decode raw HL7 v2.x messages into segment, field, and component hierarchies. | <details><summary>View</summary>![HL7 v2 Parser](screenshots/msgparser.png)</details> |
| [`tools/diff-checker.html`](tools/diff-checker.html) | HL7 Diff Checker | Compare two HL7 messages side-by-side with segment-level and field-level diff highlighting. | <details><summary>View</summary>![HL7 Diff Checker](screenshots/hl7-diff.png)</details> |
| [`tools/dicom-generator.html`](tools/dicom-generator.html) | DICOM Toolbox | Create and generate valid Explicit VR Little Endian DICOM files from scratch with custom tag injection. | <details><summary>View</summary>![DICOM Toolbox](screenshots/dicom-generator.png)</details> |
| [`tools/dicom-viewer.html`](tools/dicom-viewer.html) | Generic DICOM Viewer | Render DICOM image series locally, view tags, perform window/level, and morph tag values. | <details><summary>View</summary>![Generic DICOM Viewer](screenshots/dicom-viewer.png)</details> |
| [`tools/dicom-hl7-order.html`](tools/dicom-hl7-order.html) | DICOM → HL7 Order Generator | Extract attributes from a DICOM file to generate a standard HL7 ORM^O01 radiology order. | <details><summary>View</summary>![DICOM -> HL7 Order Generator](screenshots/dicom-hl7-order.png)</details> |
| [`tools/mwl-simulator.html`](tools/mwl-simulator.html) | DICOM MWL Simulator | Simulate a DICOM Modality Worklist (C-FIND SCU) querying a worklist SCP with mock data. | <details><summary>View</summary>![DICOM MWL Simulator](screenshots/mwl-simulator.png)</details> |

### Detailed Tool Overview & Use Cases

#### 🔍 HL7 v2 Parser ([`tools/msgparser.html`](tools/msgparser.html))
- **Description:** A utility that decodes raw HL7 v2.x messages and outputs a fully styled tree view showing segment/field details. Hovering over a segment or field breaks down component and subcomponent indexes.
- **Key Use Cases:**
  - Troubleshooting HL7 interface integration or engine issues by verifying segment structure.
  - Decoding complex clinical messages to verify patient demographics (PID), physician info, or lab results.
  - Learning the structure of HL7 segments (MSH, PID, PV1, ORC, OBR, OBX).

#### ⚖️ HL7 Diff Checker ([`tools/diff-checker.html`](tools/diff-checker.html))
- **Description:** A side-by-side diff checker tailored for HL7 messages. It highlights line modifications, insertions, and deletions, and synchronizes scrolling.
- **Key Use Cases:**
  - Comparing an inbound raw message with the output of a transformation engine to test mapping rules.
  - Identifying differences between patient messages from different source systems.
  - Quick validation of test message updates.

#### 📦 DICOM Toolbox (Generator) ([`tools/dicom-generator.html`](tools/dicom-generator.html))
- **Description:** Generates valid Explicit VR Little Endian secondary capture DICOM files (.dcm) from user-specified header attributes. Supports custom pixel data (image upload) or generates standard synthetic blocks.
- **Key Use Cases:**
  - Building synthetic DICOM file sets to test PACS, VNA, or modality query systems.
  - Exploring and understanding mandatory DICOM metadata and UIDs.
  - Crafting custom tag payloads to test database parsing and edge cases.

#### 👁️ Generic DICOM Viewer ([`tools/dicom-viewer.html`](tools/dicom-viewer.html))
- **Description:** A zero-dependency client-side viewer that loads DICOM files, parses tags, and renders images in a canvas with window/level adjustment controls. Also features cine loop playback and measurement annotations.
- **Key Use Cases:**
  - Quick, zero-install inspection of DICOM image headers and metadata tags.
  - Anonymization of clinical metadata by morphing specific patient/study tags.
  - Reviewing files on machines without dedicated diagnostic PACS workstations.

#### 🔄 DICOM → HL7 Order Generator ([`tools/dicom-hl7-order.html`](tools/dicom-hl7-order.html))
- **Description:** Parses tags from an uploaded DICOM file (e.g. Patient ID, Accession Number, Modality) and maps them directly to generate a matching HL7 ORM^O01 radiology order message.
- **Key Use Cases:**
  - Simulating clinical workflow orders directly from imaging assets.
  - Testing RIS/PACS data consistency and message translations.
  - Bridging workflows where EMR orders need to be backfilled from archived studies.

#### 📡 DICOM MWL Simulator ([`tools/mwl-simulator.html`](tools/mwl-simulator.html))
- **Description:** Simulates a modality worklist (MWL) search. Allows querying simulated worklists with key search filters (Date, Patient Name, Modality) to see what scheduled work items are returned.
- **Key Use Cases:**
  - Testing C-FIND SCU/SCP interactions and query filter compliance.
  - Verifying RIS scheduled procedure updates.
  - Training clinical engineers on modality worklist querying.

## Subprojects

- [`mwl-emulator/`](mwl-emulator/) — Python command-line DICOM MWL C-FIND SCU
  (acts like a modality querying a worklist server), built on pynetdicom.
  See its own [README](mwl-emulator/README.md).
- [`pages-repo/`](pages-repo/) — Jekyll source for the ocha.dev GitHub Pages site;
  published copies of the tools live in `pages-repo/tools/`.

## Shared theme

[`tools/theme.css`](tools/theme.css) + [`tools/theme.js`](tools/theme.js) provide the shared Monokai
dark/light theme used by `msgparser.html`, `dicom-generator.html`, and
`diff-checker.html`. The theme choice persists across tools via the
localStorage key `hl7-tools-theme`.

## Development

Dev server configs live in `.claude/launch.json` (`npx serve` on port 3000,
`python3 -m http.server` on 8080, plus configs for related projects below).
The tools also work opened directly as `file://`.

## Related projects (outside this folder)

- **HL7 parser with mapping file** — `/Users/meiosis/hl7-parser/`
  ([github.com/coffeemilktea/hl7-parser](https://github.com/coffeemilktea/hl7-parser)):
  ADT/ORM/ORU parser driven by an editable `mappings.json` for custom field
  labels, value translations, and message rewrites.

> Note: this folder lives in OneDrive for sync; standalone projects with git
> repos are kept outside it (OneDrive and git histories don't mix well).
