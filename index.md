---
layout: default
---

<section class="intro">
  <p>
    Six single-page utilities for working with <strong>HL7 v2.x</strong> and <strong>DICOM</strong> —
    parsing messages, inspecting and editing imaging metadata, generating test data, and simulating
    modality worklists. No installs, no accounts, and nothing ever leaves your machine.
  </p>
</section>

<section class="tools-section">
  <h2>Tools</h2>
  <ul class="tools-grid">

    <li class="tool-card">
      <div class="tool-card-icon">🩻</div>
      <h3>DICOM Viewer &amp; Tag Morph</h3>
      <span class="tool-subtitle">Medical Imaging</span>
      <p>View DICOM images across all major storage SOP classes — CT, MR, US, XA, NM, PET, mammo, RT and more — with window/level, cine, and measurements. Morph tags inline or in batch and re-export valid DICOM.</p>
      <a href="{{ '/tools/dicom-viewer.html' | relative_url }}" class="btn-launch">Launch &rarr;</a>
    </li>

    <li class="tool-card">
      <div class="tool-card-icon">🏥</div>
      <h3>DICOM Toolbox</h3>
      <span class="tool-subtitle">Medical Imaging</span>
      <p>Create, configure, and generate valid DICOM files from scratch, then read them back with the built-in tag browser. Ideal for testing implementations and building synthetic datasets.</p>
      <a href="{{ '/tools/dicom-generator.html' | relative_url }}" class="btn-launch">Launch &rarr;</a>
    </li>

    <li class="tool-card">
      <div class="tool-card-icon">📋</div>
      <h3>HL7 v2.x Parser</h3>
      <span class="tool-subtitle">Clinical Messaging</span>
      <p>Parse HL7 v2.x messages into a structured breakdown of segments, fields, components, and subcomponents — with highlighted and JSON views, plus FHIR resource support.</p>
      <a href="{{ '/tools/msgparser.html' | relative_url }}" class="btn-launch">Launch &rarr;</a>
    </li>

    <li class="tool-card">
      <div class="tool-card-icon">🔄</div>
      <h3>HL7 Diff Checker</h3>
      <span class="tool-subtitle">Data Validation</span>
      <p>Compare two HL7 messages side by side, down to the field level. Quickly spot what changed between an inbound message and its transformed counterpart.</p>
      <a href="{{ '/tools/diff-checker.html' | relative_url }}" class="btn-launch">Launch &rarr;</a>
    </li>

    <li class="tool-card">
      <div class="tool-card-icon">📡</div>
      <h3>MWL Simulator</h3>
      <span class="tool-subtitle">Modality Worklist</span>
      <p>Simulate or query a DICOM Modality Worklist (C-FIND SCU) with a built-in dataset, or point it at a live DICOMweb endpoint. Includes a dcmdump-style view of the request and response.</p>
      <a href="{{ '/tools/mwl-simulator.html' | relative_url }}" class="btn-launch">Launch &rarr;</a>
    </li>

    <li class="tool-card">
      <div class="tool-card-icon">🔗</div>
      <h3>DICOM &rarr; HL7 Order</h3>
      <span class="tool-subtitle">Workflow Integration</span>
      <p>Read tags from a DICOM file and generate an HL7 ORM^O01 radiology order, with a mapping table showing exactly which attribute produced each field.</p>
      <a href="{{ '/tools/dicom-hl7-order.html' | relative_url }}" class="btn-launch">Launch &rarr;</a>
    </li>

  </ul>
</section>

<section class="about-section">
  <h2>About</h2>
  <p>
    Built for healthcare IT professionals, integration engineers, and students working with medical
    data standards — whether you're debugging an interface, testing a PACS implementation, or just
    learning how these formats fit together.
  </p>
  <p>
    Every tool is a single self-contained HTML page with no build step and no dependencies. Parsing,
    rendering, and file generation all happen locally in JavaScript, which makes them safe to point at
    data that may contain PHI.
  </p>
  <span class="privacy-badge">🔒 Client-side only — no data leaves your browser</span>
</section>
