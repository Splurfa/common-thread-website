# Writing Style Guide

## Core Principles

1. **Direct, Accessible Language** - Write clearly without theatrics
2. **High Signal-to-Noise Ratio** - Every sentence should earn its place
3. **Expert Writing Approach** - Confident without being presumptuous
4. **Reader Autonomy** - Present scenarios generally; let readers make their own connections

---

## Voice & Tone

### ✅ DO: Direct, Professional Tone
- "Review the findings when you're ready"
- "This approach reduces coordination overhead"
- "The pattern enables parallel execution"
- "Consider these trade-offs before implementing"

### ❌ DON'T: Theatrical, Staccato Style
- "You make a decision. Clear. Reasoned. Urgent."
- "Not sequential. Parallel. Always."
- "The moment arrives. You choose. Now."
- "Simple. Elegant. Transformative."

---

## Describing Scenarios

### ✅ DO: General Scenarios (Let Readers Connect)
- "When multiple agents need access to shared state, memory coordination prevents conflicts"
- "Teams working across time zones benefit from asynchronous workflows"
- "Large codebases often require parallel analysis to maintain velocity"

### ❌ DON'T: Presumptuous Reader Mind-Reading
- "You're facing a deadline. Your team is distributed. You need answers fast."
- "You know the feeling—coordinating three agents, each waiting on the others"
- "Your codebase has grown beyond manual review. You're overwhelmed."
- "You sit at your desk, staring at failing tests, wondering where to start"

---

## Sentence Structure

### ✅ DO: Natural Flow with Substance
- "The session management system tracks all artifacts in a structured directory hierarchy"
- "Memory coordination relies on namespaced keys to prevent collision between agents"
- "Before spawning agents, initialize the swarm topology to establish communication patterns"

### ❌ DON'T: Over-the-Top Staccato Fragments
- "Sessions. Structured. Tracked. Always."
- "Memory. Namespaced. No collisions. Ever."
- "Agents spawn. Topology first. Communication patterns. Set."
- "Fast. Parallel. Efficient. Done."

---

## Information Density

### ✅ DO: High Signal, Minimal Bloat
```markdown
## Agent Coordination

Agents coordinate through three mechanisms:
1. Memory storage for shared state
2. Hooks for lifecycle events
3. File-based artifacts for outputs

Each mechanism serves a specific purpose and can be used independently or combined.
```

### ❌ DON'T: Padding and Filler
```markdown
## Agent Coordination: A Journey Through Distributed Intelligence

In the vast landscape of multi-agent systems, coordination emerges as one of the most critical challenges facing modern development teams. As we navigate this complex terrain, it's important to understand that agents—these powerful, autonomous units of computational intelligence—need ways to communicate, share information, and work together harmoniously toward common goals.

Let's explore the three fascinating mechanisms that make this possible...
```

---

## Instructional Writing

### ✅ DO: Clear, Actionable Instructions
```bash
# Create a new session
npx claude-flow session-start backend-api

# The command creates:
# - sessions/session-YYYYMMDD-HHMMSS-backend-api/
# - artifacts/ subdirectory structure
# - session metadata in .swarm/memory.db
```

### ❌ DON'T: Over-Explained or Under-Explained
```bash
# Now, when you're ready to embark on your development journey,
# you'll want to create what we call a "session"—think of it as
# a container for all your work, a safe space where...

# OR

# Create session
npx claude-flow session-start backend-api
# (no explanation of what happens or why)
```

---

## Technical Accuracy

### ✅ DO: Precise, Verifiable Claims
- "The Task tool spawns agents in parallel when called in a single message"
- "Memory operations use MCP tools, not CLI hooks commands"
- "Session artifacts are stored in sessions/$SESSION_ID/artifacts/"

### ❌ DON'T: Vague or Unverifiable Assertions
- "Agents work better when coordinated properly"
- "This approach is more elegant and maintainable"
- "The system intelligently optimizes your workflow"
- "Experience the power of true parallelization"

---

## Pattern Matching Rules for Agents

### Red Flags - Reject or Rewrite Immediately

**1. Theatrical Staccato Pattern**
```regex
Pattern: \b\w+\.\s+\w+\.\s+\w+\.\s*$
Examples:
- "Fast. Parallel. Done."
- "Simple. Clear. Effective."
- "Build. Test. Deploy."

Action: Rewrite as complete sentences with substance
```

**2. Reader Mind-Reading Pattern**
```regex
Pattern: ^You (know|feel|face|sit|stare|wonder|realize)
Examples:
- "You know the feeling..."
- "You face a critical decision..."
- "You sit at your desk, wondering..."

Action: Rewrite as general scenario or remove entirely
```

**3. Bloat Indicators**
```regex
Patterns:
- "journey through"
- "landscape of"
- "vast terrain of"
- "fascinating world of"
- "let's explore"
- "it's important to understand"

Action: Remove preamble, get to the point
```

**4. Empty Intensifiers**
```regex
Patterns:
- "truly"
- "really"
- "very"
- "extremely"
- "absolutely"
- "incredibly"

Action: Remove or replace with specific evidence
```

### Quality Checks - Run on Every Document

**1. Sentence Fragment Ratio**
```python
# Alert if >20% of sentences are fragments (< 5 words)
def check_fragment_ratio(text):
    sentences = split_sentences(text)
    fragments = [s for s in sentences if len(s.split()) < 5]
    ratio = len(fragments) / len(sentences)
    return ratio < 0.2  # Pass if < 20% fragments
```

**2. Second-Person Presumption Count**
```python
# Alert if >3 instances of "you [emotion/action]" per section
def check_presumption(text):
    presumptive_patterns = [
        r"you (know|feel|face|experience|realize|understand)",
        r"you're (feeling|facing|experiencing|dealing with)",
        r"you've (felt|experienced|faced|dealt with)"
    ]
    count = sum(len(re.findall(p, text, re.I)) for p in presumptive_patterns)
    return count <= 3  # Pass if ≤ 3 instances
```

**3. Bloat Word Density**
```python
# Alert if bloat words comprise >5% of total words
bloat_words = [
    "journey", "landscape", "terrain", "explore", "delve",
    "fascinating", "incredible", "amazing", "powerful",
    "truly", "really", "very", "extremely", "absolutely"
]

def check_bloat_density(text):
    words = text.lower().split()
    bloat_count = sum(words.count(b) for b in bloat_words)
    density = bloat_count / len(words)
    return density < 0.05  # Pass if < 5% bloat
```

**4. Signal-to-Noise Ratio**
```python
# Alert if technical content < 60% of text
def check_signal_ratio(text):
    # Technical content: code blocks, commands, file paths,
    # specific tools, concrete examples
    technical_patterns = [
        r'`[^`]+`',  # Inline code
        r'```[\s\S]+?```',  # Code blocks
        r'\b(mcp__|npx|bash|npm|git)\b',  # Tools
        r'/[\w\-/\.]+',  # File paths
    ]

    technical_content = sum(len(re.findall(p, text)) for p in technical_patterns)
    total_words = len(text.split())

    # Rough heuristic: technical elements should appear frequently
    return technical_content / total_words > 0.1
```

---

## Rewriting Checklist for Agents

Before finalizing any documentation:

- [ ] Remove all theatrical staccato patterns
- [ ] Replace reader mind-reading with general scenarios
- [ ] Cut bloat words and empty intensifiers
- [ ] Verify all technical claims are specific and accurate
- [ ] Ensure sentence fragment ratio < 20%
- [ ] Confirm signal-to-noise ratio is high
- [ ] Check that instructions are actionable without being patronizing
- [ ] Remove any presumptuous "you" statements about reader's situation

---

## Examples: Before & After

### Example 1: Feature Introduction

**❌ BEFORE:**
```markdown
# Memory Coordination: A Powerful Approach

You're building a complex system. Multiple agents. Shared state. You know
the challenges—race conditions, conflicts, chaos.

Not anymore.

Memory coordination changes everything. Clean. Simple. Elegant.

Let's explore this fascinating approach to distributed agent intelligence...
```

**✅ AFTER:**
```markdown
# Memory Coordination

Memory coordination enables multiple agents to share state safely through
namespaced key-value storage.

## Core Mechanism

Agents store and retrieve data using MCP tools:
- `memory_usage` with action "store" writes data
- `memory_usage` with action "retrieve" reads data
- Namespaces prevent key collisions between agents

## When to Use

Use memory coordination when:
- Multiple agents need access to shared decisions
- Agent outputs depend on previous agent results
- Workflow state must persist across agent lifecycles
```

### Example 2: Tutorial Section

**❌ BEFORE:**
```markdown
Now you're ready to spawn your first agent. Exciting! You sit at your terminal,
cursor blinking, about to unlock the true power of parallel agent orchestration.

Type the command. Watch the magic happen. Simple. Fast. Revolutionary.

npx claude-flow agent-spawn researcher

See? You did it. Your agent springs to life, ready to tackle your challenge.
```

**✅ AFTER:**
```markdown
## Spawning Agents

Spawn agents using the CLI:

```bash
npx claude-flow agent-spawn researcher
```

This creates an agent of type "researcher" with default capabilities. The agent
receives the current session context and can access shared memory.

To spawn multiple agents in parallel, use the Task tool in a single message (see
Agent Coordination guide for details).
```

### Example 3: Conceptual Explanation

**❌ BEFORE:**
```markdown
# The Beautiful Dance of Swarm Topologies

In the vast landscape of distributed systems, topology emerges as one of the
most critical—and truly fascinating—aspects of multi-agent coordination. You
face a choice. Mesh? Hierarchical? Ring? Star? Each topology brings its own
unique advantages and challenges to your particular scenario.

Think of it like a network of neurons firing in perfect harmony, or perhaps
like a flock of birds moving as one...
```

**✅ AFTER:**
```markdown
# Swarm Topologies

A swarm topology defines how agents communicate. Four topologies are available:

## Mesh Topology
- Every agent connects to every other agent
- Best for: Small swarms (< 5 agents) requiring full coordination
- Trade-off: Connection overhead scales quadratically

## Hierarchical Topology
- Tree structure with coordinator nodes
- Best for: Large swarms with clear delegation patterns
- Trade-off: Coordinator nodes become bottlenecks

## Ring Topology
- Agents connect in a circular chain
- Best for: Pipeline workflows with sequential dependencies
- Trade-off: Single point of failure breaks the ring

## Star Topology
- All agents connect through central coordinator
- Best for: Fan-out/fan-in patterns with centralized control
- Trade-off: Coordinator failure halts entire swarm

Select topology based on swarm size, coordination needs, and fault tolerance requirements.
```

---

## Usage for Execution Agents

### When Reviewing Generated Content

Run this mental checklist:
1. Is every sentence providing new, specific information?
2. Are there any theatrical fragments that should be complete sentences?
3. Did I avoid presuming the reader's situation or emotions?
4. Can I cut 20% of the words without losing meaning?
5. Are technical claims verifiable with specific references?

### When Generating New Content

Follow this structure:
1. **Start with the core concept** (no preamble)
2. **Define mechanisms precisely** (how it works)
3. **Provide specific use cases** (when to use it)
4. **Show concrete examples** (code, commands, outputs)
5. **Address trade-offs directly** (what you gain/lose)

### Red Flag Detection

If you write any of these phrases, stop and revise:
- "You know the feeling..."
- "Let's explore..."
- "In the vast landscape of..."
- "This powerful approach..."
- "Simple. Elegant. Fast."
- Any sentence starting with "Imagine..."
- Any paragraph starting with "Now you're ready..."

---

## Quality Standards

Every document should pass these tests:

**Precision Test**: Can someone implement the described pattern using only this document?

**Efficiency Test**: Could you cut 30% of the words without losing essential information?

**Tone Test**: Does it sound like an expert colleague explaining something, or a motivational speaker?

**Autonomy Test**: Does it present options and let readers decide, or does it tell them what they're experiencing?

---

## For AI Agents: Implementation Protocol

When asked to review or rewrite documentation:

1. **Load this style guide** before beginning work
2. **Run pattern matching** on existing content
3. **Flag violations** with specific line references
4. **Propose rewrites** following DO examples
5. **Verify rewrites** against quality standards
6. **Document changes** made and rationale

This ensures consistency across all agent-generated documentation while maintaining high quality and reader respect.
