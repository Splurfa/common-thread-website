# Multi-Agent Article Coordination Protocol
## Version 1.0 - Common Thread Website Content Development

---

## 🎯 Protocol Objective

Enable 4 execution agents to develop distinct articles simultaneously while maintaining:
- **Style Consistency**: Unified voice and tone across all articles
- **Content Uniqueness**: Zero overlap in concepts, examples, or phrasing
- **Quality Alignment**: Shared standards for depth, clarity, and value
- **Efficient Coordination**: Minimal blocking, maximum parallel progress

---

## 🏗️ Architecture Overview

### Agent Roles
- **Agent 1**: Article A development + Style Baseline
- **Agent 2**: Article B development + Overlap Detection
- **Agent 3**: Article C development + Concept Registry
- **Agent 4**: Article D development + Quality Validation

### Coordination Topology
```
┌─────────────────────────────────────────────────────────────┐
│                    Coordination Memory                       │
│  .swarm/memory.db - Shared state across all agents          │
└─────────────────────────────────────────────────────────────┘
         ↑                ↑                ↑                ↑
         │                │                │                │
    ┌────┴────┐      ┌────┴────┐      ┌────┴────┐      ┌────┴────┐
    │ Agent 1 │      │ Agent 2 │      │ Agent 3 │      │ Agent 4 │
    │Article A│      │Article B│      │Article C│      │Article D│
    │+ Style  │      │+ Overlap│      │+ Concept│      │+ Quality│
    └─────────┘      └─────────┘      └─────────┘      └─────────┘
```

---

## 📋 Coordination Checkpoints

### Checkpoint Schedule

| Phase | Timing | Focus | Deliverables |
|-------|--------|-------|--------------|
| **CP1: Initialization** | 0min | Setup & Baselines | Outlines, style guide, concept claims |
| **CP2: Early Draft** | 25% progress | Direction validation | 1st drafts, overlap scan, style check |
| **CP3: Mid-Development** | 50% progress | Deep coordination | Full drafts, cross-review, concept audit |
| **CP4: Pre-Refinement** | 75% progress | Quality alignment | Near-final drafts, final overlap check |
| **CP5: Finalization** | 95% progress | Final sync | Polished articles, cross-validation |

---

## 🔄 Checkpoint 1: Initialization (0min)

### Agent Tasks

**All Agents (Parallel)**:
```bash
# 1. Create article outline
# 2. Claim core concepts
# 3. Define unique value proposition
```

**Agent 1 (Style Baseline)**:
```javascript
// Store style guide in memory
mcp__claude-flow_alpha__memory_usage({
  action: "store",
  key: "style/baseline",
  namespace: "coordination",
  value: JSON.stringify({
    tone: "conversational yet authoritative",
    sentence_length: "varied, avg 15-20 words",
    paragraph_structure: "3-5 sentences",
    examples_per_section: 1-2,
    technical_depth: "intermediate",
    voice_attributes: ["direct", "pragmatic", "developer-focused"]
  })
})

// Store Article A outline
mcp__claude-flow_alpha__memory_usage({
  action: "store",
  key: "article/A/outline",
  namespace: "coordination",
  value: JSON.stringify({
    title: "Article A Title",
    sections: ["intro", "section1", "section2", "conclusion"],
    core_concepts: ["concept1", "concept2", "concept3"],
    unique_angle: "specific differentiation point"
  })
})
```

**Agent 3 (Concept Registry)**:
```javascript
// Create concept claim registry
mcp__claude-flow_alpha__memory_usage({
  action: "store",
  key: "concepts/registry",
  namespace: "coordination",
  value: JSON.stringify({
    claimed_concepts: {
      "concept1": { article: "A", context: "main focus" },
      "concept2": { article: "B", context: "secondary" },
      "concept3": { article: "C", context: "example" }
    },
    shared_concepts: [], // Concepts allowed in multiple articles
    restricted_phrases: [] // Exact phrases to avoid duplicating
  })
})
```

### Validation Criteria
- ✅ All 4 outlines stored in memory
- ✅ No core concept conflicts
- ✅ Style baseline established
- ✅ Each article has unique angle

### Proceed Condition
All agents confirm: "CP1 complete - outline ready, concepts claimed"

---

## 🔄 Checkpoint 2: Early Draft (25% Progress)

### Timing
**When**: Each agent reaches 25% completion (~300-400 words written)

### Agent Tasks

**All Agents (Parallel)**:
```bash
# 1. Write introduction + first major section
# 2. Store draft in memory
# 3. Report progress
```

**Storage Pattern**:
```javascript
// Each agent stores their draft
mcp__claude-flow_alpha__memory_usage({
  action: "store",
  key: "article/[A|B|C|D]/draft-25pct",
  namespace: "coordination",
  value: JSON.stringify({
    timestamp: Date.now(),
    word_count: 350,
    sections_complete: ["intro", "section1"],
    key_phrases: ["phrase1", "phrase2"], // For overlap detection
    concepts_used: ["concept1", "concept2"]
  })
})
```

**Agent 2 (Overlap Detection)**:
```javascript
// Automated overlap scan
async function detectOverlap() {
  // 1. Retrieve all 4 drafts from memory
  const drafts = await Promise.all([
    memory.retrieve("article/A/draft-25pct"),
    memory.retrieve("article/B/draft-25pct"),
    memory.retrieve("article/C/draft-25pct"),
    memory.retrieve("article/D/draft-25pct")
  ]);

  // 2. Extract all key phrases
  const allPhrases = drafts.flatMap(d => d.key_phrases);

  // 3. Find duplicates (3+ word sequences)
  const duplicates = findDuplicatePhrases(allPhrases);

  // 4. Store overlap report
  await memory.store("overlap/report-25pct", {
    timestamp: Date.now(),
    duplicates: duplicates,
    severity: duplicates.length > 0 ? "NEEDS_RESOLUTION" : "CLEAR",
    recommendations: generateRecommendations(duplicates)
  });

  // 5. Notify agents if overlaps found
  if (duplicates.length > 0) {
    await memory.store("coordination/alert", {
      type: "OVERLAP_DETECTED",
      checkpoint: "CP2",
      affected_articles: getAffectedArticles(duplicates),
      action_required: "Review and rephrase overlapping content"
    });
  }
}
```

**Agent 1 (Style Validation)**:
```javascript
// Check style consistency
async function validateStyle(draftKey) {
  const baseline = await memory.retrieve("style/baseline");
  const draft = await memory.retrieve(draftKey);

  const metrics = {
    avg_sentence_length: calculateAvgSentenceLength(draft),
    tone_match: analyzeTone(draft, baseline.tone),
    voice_consistency: checkVoiceAttributes(draft, baseline.voice_attributes),
    paragraph_structure: validateParagraphs(draft)
  };

  await memory.store(`style/validation/${draftKey}`, {
    timestamp: Date.now(),
    metrics: metrics,
    passed: Object.values(metrics).every(m => m.score > 0.8),
    recommendations: generateStyleRecommendations(metrics, baseline)
  });
}
```

### Validation Criteria
- ✅ All 4 drafts at 25% completion
- ✅ No phrase overlap (3+ word sequences)
- ✅ Style consistency score > 0.8 for all articles
- ✅ Concept usage matches claimed concepts

### Resolution Workflow (If Issues Found)

**Overlap Resolution**:
```javascript
// Agent 2 flags overlap, affected agents resolve
if (overlapDetected) {
  // 1. Identify which articles have overlap
  const conflicts = getConflicts();

  // 2. Assign resolution responsibility (first writer keeps, others rephrase)
  const resolution = {
    "phrase_X": { keeper: "Article_A", rephrasers: ["Article_B", "Article_C"] }
  };

  // 3. Store resolution plan
  await memory.store("coordination/resolution-cp2", resolution);

  // 4. Agents rephrase and re-submit
  // 5. Re-run overlap detection
}
```

### Proceed Condition
All agents confirm: "CP2 complete - early draft validated, overlaps resolved"

---

## 🔄 Checkpoint 3: Mid-Development (50% Progress)

### Timing
**When**: Each agent reaches 50% completion (~700-800 words written)

### Agent Tasks

**All Agents (Parallel)**:
```bash
# 1. Complete all major sections
# 2. Store full draft in memory
# 3. Submit for cross-review
```

**Cross-Review Protocol**:
```javascript
// Round-robin review assignments
const reviewAssignments = {
  "Agent 1": { reviews: ["Article B"], primary: "Article A" },
  "Agent 2": { reviews: ["Article C"], primary: "Article B" },
  "Agent 3": { reviews: ["Article D"], primary: "Article C" },
  "Agent 4": { reviews: ["Article A"], primary: "Article D" }
};

// Each agent performs cross-review
async function performCrossReview(assignedArticle) {
  const draft = await memory.retrieve(`article/${assignedArticle}/draft-50pct`);
  const myDraft = await memory.retrieve(`article/${myArticle}/draft-50pct`);

  const review = {
    timestamp: Date.now(),
    reviewer: myAgentId,
    reviewed: assignedArticle,
    checks: {
      overlap_with_my_article: detectLocalOverlap(draft, myDraft),
      concept_uniqueness: validateConceptUsage(draft),
      style_consistency: checkStyleAlignment(draft),
      quality_score: assessQuality(draft)
    },
    recommendations: generateRecommendations(),
    approval_status: "APPROVED" | "NEEDS_REVISION"
  };

  await memory.store(`reviews/${assignedArticle}/from-${myAgentId}`, review);
}
```

**Agent 3 (Concept Audit)**:
```javascript
// Deep concept usage analysis
async function auditConceptUsage() {
  const registry = await memory.retrieve("concepts/registry");
  const drafts = await getAllDrafts("50pct");

  const audit = {
    timestamp: Date.now(),
    concept_violations: [],
    concept_overlap: [],
    recommendations: []
  };

  // Check each article against registry
  for (const [article, draft] of Object.entries(drafts)) {
    for (const concept of draft.concepts_used) {
      const claim = registry.claimed_concepts[concept];

      // If concept claimed by another article as "main focus"
      if (claim && claim.article !== article && claim.context === "main focus") {
        audit.concept_violations.push({
          article: article,
          concept: concept,
          violation: `Using ${concept} as secondary, but it's main focus of Article ${claim.article}`,
          severity: "MEDIUM",
          action: "Reduce emphasis or replace with alternative concept"
        });
      }
    }
  }

  await memory.store("concepts/audit-50pct", audit);

  // Alert if violations found
  if (audit.concept_violations.length > 0) {
    await memory.store("coordination/alert", {
      type: "CONCEPT_VIOLATION",
      checkpoint: "CP3",
      violations: audit.concept_violations
    });
  }
}
```

**Agent 4 (Quality Validation)**:
```javascript
// Quality standards enforcement
async function validateQuality() {
  const drafts = await getAllDrafts("50pct");
  const baseline = await memory.retrieve("quality/standards");

  const validation = {
    timestamp: Date.now(),
    articles: {}
  };

  for (const [article, draft] of Object.entries(drafts)) {
    validation.articles[article] = {
      word_count: draft.word_count,
      readability_score: calculateReadability(draft),
      technical_depth: assessTechnicalDepth(draft),
      example_quality: evaluateExamples(draft),
      actionability: measureActionability(draft),
      overall_score: 0, // Calculate weighted average
      pass: false
    };

    // Calculate overall score
    const scores = Object.values(validation.articles[article])
      .filter(v => typeof v === 'number');
    validation.articles[article].overall_score =
      scores.reduce((a, b) => a + b, 0) / scores.length;

    validation.articles[article].pass =
      validation.articles[article].overall_score > 0.75;
  }

  await memory.store("quality/validation-50pct", validation);
}
```

### Validation Criteria
- ✅ All 4 articles at 50% completion
- ✅ Cross-reviews complete with recommendations
- ✅ No concept violations
- ✅ Quality scores > 0.75 for all articles
- ✅ No overlapping phrases (extended to 5+ word sequences)

### Proceed Condition
All agents confirm: "CP3 complete - mid-draft validated, cross-reviews addressed"

---

## 🔄 Checkpoint 4: Pre-Refinement (75% Progress)

### Timing
**When**: Each agent reaches 75% completion (~1100-1200 words written)

### Agent Tasks

**All Agents (Parallel)**:
```bash
# 1. Complete all sections including conclusion
# 2. Refine based on previous checkpoint feedback
# 3. Submit near-final draft
```

**Final Overlap Scan Protocol**:
```javascript
// Agent 2 performs comprehensive overlap detection
async function finalOverlapScan() {
  const drafts = await getAllDrafts("75pct");

  const scan = {
    timestamp: Date.now(),
    phrase_overlap: [],
    concept_overlap: [],
    example_overlap: [],
    structure_similarity: []
  };

  // 1. N-gram analysis (3, 5, 7 word sequences)
  for (let n = 3; n <= 7; n += 2) {
    const ngrams = extractNGrams(drafts, n);
    const duplicates = findDuplicates(ngrams);

    if (duplicates.length > 0) {
      scan.phrase_overlap.push({
        ngram_size: n,
        duplicates: duplicates,
        severity: n >= 5 ? "HIGH" : "MEDIUM"
      });
    }
  }

  // 2. Semantic similarity check (concepts, not exact phrases)
  const semanticAnalysis = await analyzeSemanticSimilarity(drafts);
  if (semanticAnalysis.similarity_score > 0.6) {
    scan.concept_overlap.push({
      articles: semanticAnalysis.similar_pairs,
      score: semanticAnalysis.similarity_score,
      severity: "HIGH",
      recommendation: "Differentiate conceptual approach"
    });
  }

  // 3. Example/analogy overlap
  const examples = extractExamples(drafts);
  const duplicateExamples = findDuplicateExamples(examples);
  scan.example_overlap = duplicateExamples;

  // 4. Structural similarity (section flow, argument structure)
  const structures = extractStructures(drafts);
  const similarStructures = findSimilarStructures(structures);
  scan.structure_similarity = similarStructures;

  await memory.store("overlap/final-scan-75pct", scan);

  // Alert if any overlaps found
  const hasOverlap =
    scan.phrase_overlap.length > 0 ||
    scan.concept_overlap.length > 0 ||
    scan.example_overlap.length > 0 ||
    scan.structure_similarity.length > 0;

  if (hasOverlap) {
    await memory.store("coordination/alert", {
      type: "FINAL_OVERLAP_DETECTED",
      checkpoint: "CP4",
      scan_results: scan,
      action_required: "IMMEDIATE_RESOLUTION_REQUIRED"
    });
  }

  return scan;
}
```

**Style Consistency Final Check**:
```javascript
// Agent 1 performs final style validation
async function finalStyleCheck() {
  const baseline = await memory.retrieve("style/baseline");
  const drafts = await getAllDrafts("75pct");

  const validation = {
    timestamp: Date.now(),
    articles: {},
    consistency_matrix: {}, // Cross-article consistency scores
    overall_consistency: 0
  };

  // 1. Validate each article against baseline
  for (const [article, draft] of Object.entries(drafts)) {
    validation.articles[article] = {
      tone_match: analyzeTone(draft, baseline.tone),
      voice_consistency: checkVoiceAttributes(draft, baseline.voice_attributes),
      sentence_rhythm: validateSentenceRhythm(draft, baseline),
      paragraph_flow: validateParagraphFlow(draft, baseline),
      technical_level: assessTechnicalLevel(draft, baseline.technical_depth),
      overall_score: 0
    };

    // Calculate overall score
    const scores = Object.values(validation.articles[article])
      .filter(v => typeof v === 'number');
    validation.articles[article].overall_score =
      scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  // 2. Cross-article consistency matrix
  const articleKeys = Object.keys(drafts);
  for (let i = 0; i < articleKeys.length; i++) {
    for (let j = i + 1; j < articleKeys.length; j++) {
      const article1 = articleKeys[i];
      const article2 = articleKeys[j];

      validation.consistency_matrix[`${article1}-${article2}`] =
        calculateCrossConsistency(drafts[article1], drafts[article2]);
    }
  }

  // 3. Overall consistency score
  const allScores = Object.values(validation.consistency_matrix);
  validation.overall_consistency =
    allScores.reduce((a, b) => a + b, 0) / allScores.length;

  await memory.store("style/final-validation-75pct", validation);

  // Alert if consistency issues
  if (validation.overall_consistency < 0.85) {
    await memory.store("coordination/alert", {
      type: "STYLE_INCONSISTENCY",
      checkpoint: "CP4",
      consistency_score: validation.overall_consistency,
      action_required: "Style harmonization needed"
    });
  }

  return validation;
}
```

### Validation Criteria
- ✅ All 4 articles at 75% completion
- ✅ Zero phrase overlap (3+ word sequences)
- ✅ Zero example/analogy overlap
- ✅ Structural diversity (no identical argument flows)
- ✅ Style consistency > 0.85 across all articles
- ✅ Quality scores > 0.8 for all articles

### Proceed Condition
All agents confirm: "CP4 complete - near-final draft validated, ready for refinement"

---

## 🔄 Checkpoint 5: Finalization (95% Progress)

### Timing
**When**: Each agent completes final polish (~1400-1500 words)

### Agent Tasks

**All Agents (Parallel)**:
```bash
# 1. Apply final refinements
# 2. Polish language and flow
# 3. Submit final draft for validation
```

**Final Cross-Validation Protocol**:
```javascript
// All agents perform final validation
async function finalCrossValidation() {
  const drafts = await getAllDrafts("final");

  const validation = {
    timestamp: Date.now(),
    articles: {},
    ready_for_publish: false
  };

  // Each article gets validated by ALL other agents
  for (const [article, draft] of Object.entries(drafts)) {
    validation.articles[article] = {
      overlap_check: await runOverlapCheck(draft, article),
      style_check: await runStyleCheck(draft),
      quality_check: await runQualityCheck(draft),
      uniqueness_check: await runUniquenessCheck(draft, article),
      approved_by: []
    };

    // Each agent votes
    for (const agentId of [1, 2, 3, 4]) {
      const approval = await getAgentApproval(agentId, article, draft);
      if (approval.approved) {
        validation.articles[article].approved_by.push(agentId);
      }
    }

    // Require 3/4 agent approval
    validation.articles[article].ready =
      validation.articles[article].approved_by.length >= 3;
  }

  // Overall ready check
  validation.ready_for_publish = Object.values(validation.articles)
    .every(a => a.ready);

  await memory.store("validation/final", validation);

  return validation;
}
```

**Uniqueness Certification**:
```javascript
// Agent 3 certifies article uniqueness
async function certifyUniqueness() {
  const drafts = await getAllDrafts("final");

  const certification = {
    timestamp: Date.now(),
    articles: {}
  };

  for (const [article, draft] of Object.entries(drafts)) {
    certification.articles[article] = {
      unique_concepts: identifyUniqueConcepts(draft, article),
      unique_examples: identifyUniqueExamples(draft, article),
      unique_angle: describeUniqueAngle(draft, article),
      differentiation_score: calculateDifferentiation(draft, article),
      certified: false
    };

    // Certification threshold: differentiation > 0.7
    certification.articles[article].certified =
      certification.articles[article].differentiation_score > 0.7;
  }

  await memory.store("uniqueness/certification-final", certification);

  return certification;
}
```

### Validation Criteria
- ✅ All 4 articles at 95%+ completion
- ✅ 3/4 agent approval for each article
- ✅ Uniqueness certification passed for all articles
- ✅ Final overlap scan: ZERO issues
- ✅ Style consistency: > 0.9 across all articles
- ✅ Quality scores: > 0.85 for all articles

### Proceed Condition
All agents confirm: "CP5 complete - all articles certified unique and ready for publish"

---

## 🚨 Overlap Resolution Workflow

### Severity Levels

| Severity | Definition | Example | Resolution Time |
|----------|------------|---------|-----------------|
| **LOW** | 3-word phrase overlap, <2 occurrences | "In this article, we" | Self-resolve, no coordination |
| **MEDIUM** | 5-word phrase overlap OR concept similarity >0.5 | "The key to understanding this pattern" | 15min coordination window |
| **HIGH** | 7+ word phrase overlap OR identical example | Entire paragraph or analogy match | 30min coordination + review |
| **CRITICAL** | Structural overlap OR concept claim violation | Same argument flow or main concept | Immediate halt, full rework |

### Resolution Protocol

```javascript
async function resolveOverlap(overlap) {
  const { severity, type, affected_articles, details } = overlap;

  if (severity === "LOW") {
    // Auto-resolve: Each agent rephrases independently
    await notifyAgents(affected_articles, {
      action: "REPHRASE",
      target: details.phrase,
      deadline: "immediate"
    });
    return;
  }

  if (severity === "MEDIUM") {
    // Coordination required
    // 1. Determine "keeper" (first writer or better context)
    const keeper = determineKeeper(affected_articles, details);
    const rephrasers = affected_articles.filter(a => a !== keeper);

    // 2. Notify agents
    await memory.store("coordination/resolution", {
      timestamp: Date.now(),
      type: type,
      keeper: keeper,
      rephrasers: rephrasers,
      target: details,
      deadline: Date.now() + (15 * 60 * 1000) // 15 minutes
    });

    // 3. Wait for resolution
    await waitForResolution(rephrasers, 15 * 60 * 1000);

    // 4. Re-scan
    await runOverlapCheck();

    return;
  }

  if (severity === "HIGH" || severity === "CRITICAL") {
    // Immediate coordination required
    // 1. Halt all progress
    await memory.store("coordination/alert", {
      type: "CRITICAL_OVERLAP",
      severity: severity,
      affected_articles: affected_articles,
      details: details,
      action: "IMMEDIATE_COORDINATION_REQUIRED"
    });

    // 2. Affected agents enter resolution mode
    const resolution = await coordinateResolution(affected_articles, details);

    // 3. Submit resolution plan for approval
    await memory.store("coordination/resolution-plan", resolution);

    // 4. Execute resolution
    await executeResolution(resolution);

    // 5. Full re-validation
    await runFullValidation();

    return;
  }
}
```

---

## 📊 Coordination Memory Schema

### Memory Namespace Structure

```
coordination/
├── style/
│   ├── baseline              # Style guide reference
│   ├── validation-25pct      # CP2 style checks
│   ├── validation-50pct      # CP3 style checks
│   └── final-validation-75pct # CP4 style checks
│
├── concepts/
│   ├── registry              # Concept claim registry
│   ├── audit-50pct           # CP3 concept audit
│   └── certification-final   # CP5 uniqueness cert
│
├── article/
│   ├── A/
│   │   ├── outline
│   │   ├── draft-25pct
│   │   ├── draft-50pct
│   │   ├── draft-75pct
│   │   └── final
│   ├── B/ (same structure)
│   ├── C/ (same structure)
│   └── D/ (same structure)
│
├── overlap/
│   ├── report-25pct          # CP2 overlap scan
│   ├── report-50pct          # CP3 overlap scan
│   └── final-scan-75pct      # CP4 final overlap scan
│
├── quality/
│   ├── standards             # Quality baseline
│   ├── validation-50pct      # CP3 quality check
│   └── validation-final      # CP5 quality check
│
├── reviews/
│   ├── A/
│   │   ├── from-agent-2
│   │   ├── from-agent-3
│   │   └── from-agent-4
│   └── (B, C, D similar)
│
└── coordination/
    ├── alert                 # Current alert/blocker
    ├── resolution            # Active resolution
    └── resolution-plan       # Pending resolution plan
```

---

## 🎯 Success Metrics

### Per-Checkpoint KPIs

| Checkpoint | Key Metrics | Success Threshold |
|------------|-------------|-------------------|
| **CP1** | Concept claims registered, Outlines validated | 100% completion |
| **CP2** | Overlap incidents, Style consistency | <2 overlaps, >0.8 style |
| **CP3** | Cross-review scores, Quality scores | >0.75 all articles |
| **CP4** | Final overlap scan, Consistency score | 0 overlaps, >0.85 consistency |
| **CP5** | Approval votes, Uniqueness certification | 3/4 approval, 100% certified |

### Overall Success Criteria

- ✅ **Zero Content Overlap**: No shared phrases (3+ words), examples, or analogies
- ✅ **Concept Uniqueness**: Each article owns distinct core concepts
- ✅ **Style Consistency**: Cross-article consistency > 0.9
- ✅ **Quality Standards**: All articles > 0.85 quality score
- ✅ **Uniqueness Certification**: All articles differentiation score > 0.7
- ✅ **Agent Approval**: Each article approved by 3/4 agents

---

## 🔧 Implementation Commands

### Agent Startup Sequence

```bash
# Initialize coordination memory
mcp__claude-flow_alpha__swarm_init({
  topology: "mesh",
  maxAgents: 4,
  strategy: "balanced"
})

# Spawn 4 execution agents
Task("Article A Agent", "Develop Article A following coordination protocol. Save to sessions/$SESSION_ID/artifacts/code/. Role: Style Baseline + Article Development", "coder")
Task("Article B Agent", "Develop Article B following coordination protocol. Save to sessions/$SESSION_ID/artifacts/code/. Role: Overlap Detection + Article Development", "coder")
Task("Article C Agent", "Develop Article C following coordination protocol. Save to sessions/$SESSION_ID/artifacts/code/. Role: Concept Registry + Article Development", "coder")
Task("Article D Agent", "Develop Article D following coordination protocol. Save to sessions/$SESSION_ID/artifacts/code/. Role: Quality Validation + Article Development", "coder")
```

### Checkpoint Execution Pattern

```javascript
// Each agent follows this pattern at each checkpoint

// 1. Store draft
mcp__claude-flow_alpha__memory_usage({
  action: "store",
  key: `article/${myArticle}/draft-${checkpoint}`,
  namespace: "coordination",
  value: JSON.stringify(myDraft)
})

// 2. Perform specialized role task (e.g., overlap detection for Agent 2)
if (myRole === "overlap-detector") {
  await detectOverlap();
}

// 3. Wait for all agents to reach checkpoint
await waitForCheckpoint(checkpoint);

// 4. Retrieve coordination results
const results = await memory.retrieve(`${myRole}/validation-${checkpoint}`);

// 5. Address any issues flagged
if (results.issues.length > 0) {
  await resolveIssues(results.issues);
}

// 6. Confirm checkpoint completion
await memory.store(`coordination/checkpoint-${checkpoint}/agent-${myId}`, {
  status: "COMPLETE",
  timestamp: Date.now()
});

// 7. Proceed to next phase
await proceedToNextPhase();
```

---

## 📝 Agent Coordination Checklist

### Pre-Work (Before CP1)
- [ ] Read and understand coordination protocol
- [ ] Identify assigned article and secondary role
- [ ] Review style baseline and quality standards
- [ ] Claim core concepts in registry
- [ ] Create detailed outline
- [ ] Confirm no concept conflicts

### During Development (CP1-CP4)
- [ ] Store draft at each checkpoint milestone
- [ ] Perform secondary role duties (overlap detection, etc.)
- [ ] Monitor coordination memory for alerts
- [ ] Participate in cross-reviews when assigned
- [ ] Resolve flagged overlaps within deadline
- [ ] Adjust based on validation feedback

### Finalization (CP5)
- [ ] Submit final draft for cross-validation
- [ ] Vote on all other articles (approve/request revision)
- [ ] Address any final revision requests
- [ ] Confirm uniqueness certification
- [ ] Final approval confirmation

---

## 🚀 Protocol Activation

To activate this coordination protocol:

1. **Initialize Coordination Memory**: Run swarm_init
2. **Spawn 4 Agents**: Use Task tool with role assignments
3. **Share Protocol**: All agents read this document
4. **Execute CP1**: Each agent creates outline and claims concepts
5. **Follow Checkpoint Sequence**: Progress through CP1 → CP5
6. **Validate Success**: Confirm all success criteria met

---

## 📚 References

- **Swarm Coordination Guide**: [docs/coordinate/swarm-coordination.md](../../../docs/coordinate/swarm-coordination.md)
- **Memory Coordination Tutorial**: [docs/operate/memory-coordination-tutorial.md](../../../docs/operate/memory-coordination-tutorial.md)
- **Session Management**: [docs/operate/session-management.md](../../../docs/operate/session-management.md)
- **Agent Spawning**: [docs/build/spawning-agents.md](../../../docs/build/spawning-agents.md)

---

## Version History

- **v1.0** (2025-11-23): Initial protocol design
  - 5 checkpoint structure
  - Multi-role agent assignments
  - Comprehensive overlap detection
  - Cross-validation workflows
  - Memory-based coordination
