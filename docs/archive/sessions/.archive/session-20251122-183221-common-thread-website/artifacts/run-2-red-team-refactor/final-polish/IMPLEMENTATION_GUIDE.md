# Implementation Guide
**Step-by-Step Instructions for Applying Red Team Improvements**
**Date:** 2025-11-22
**Session:** session-20251122-183221-common-thread-website

---

## Overview

This guide provides exact steps to apply the red team-approved improvements to your website content.

**Total Time Required:** 5-15 minutes
**Difficulty:** Easy
**Risk Level:** Low

---

## Prerequisites

- Access to project files
- Text editor or IDE
- Basic git knowledge (for version control)

---

## Quick Decision Matrix

### Option A: Minimal Changes (1 minute)

**Action:** Delete Blog v2
**Files to Change:** 1
**Time:** 1 minute
**Result:** Remove AI-engineering violation

**Choose if:**
- You want the fastest path to production
- Current content is acceptable (8/10 and 9/10 scores)
- You don't need minor polish improvements

### Option B: Full Polish (15 minutes)

**Action:** Delete Blog v2 + Apply minor polish to site copy and blog
**Files to Change:** 3
**Time:** 15 minutes
**Result:** Eliminate all AI-engineering language (8.5/10 and 9.5/10 scores)

**Choose if:**
- You want the highest quality voice consistency
- You have time for minor improvements
- You want to maximize human-client focus

---

## STEP 1: IMMEDIATE ACTION REQUIRED

### Delete Blog v2

**File to Delete:**
```
docs/The Human Standard.md
```

**Why:** This file contains 60% AI-engineering violations and cannot be salvaged.

**Commands:**

```bash
# Option 1: Delete permanently
rm docs/The\ Human\ Standard.md

# Option 2: Archive for reference
mkdir -p archive/rejected-content
mv docs/The\ Human\ Standard.md archive/rejected-content/

# Commit the deletion
git add -A
git commit -m "Remove AI-engineering blog post (rejected by red team audit)"
```

**Verification:**
```bash
# Confirm file is deleted
ls docs/The\ Human\ Standard.md
# Should output: No such file or directory
```

**Time Required:** 1 minute

---

## STEP 2: OPTIONAL POLISH - Site Copy

**File to Edit:**
```
docs/site-copy.md
```

**Impact:** 8.0/10 → 8.5/10 score
**Time Required:** 5 minutes

### Change 1: Line 37

**FIND:**
```markdown
**Body:** You provide the unique human signal - the connection. Our infrastructure handles the rest.
```

**REPLACE WITH:**
```markdown
**Body:** You provide the unique human signal - the connection. The infrastructure handles the rest.
```

**Reason:** Removes possessive tech reference ("Our" → "The")

---

### Change 2: Line 38

**FIND:**
```markdown
> Our translation layer sits between your directive and the machinery of execution. It routes and realizes intent automatically.
```

**REPLACE WITH:**
```markdown
> The invisible infrastructure sits between your directive and the machinery of execution. It routes and realizes intent automatically.
```

**Reason:** Eliminates "translation layer" (AI-engineering term) and strengthens metaphor

---

### Change 3: Line 71

**FIND:**
```markdown
> The technology is ready. The question is no longer about capability, but about willingness to adapt.
```

**REPLACE WITH:**
```markdown
> The question is about willingness to adapt.
```

**Reason:** Removes technology capability focus, keeps philosophical question

---

### Verification: Site Copy

**Before changes:**
```bash
grep -n "Our translation layer" docs/site-copy.md
grep -n "Our infrastructure" docs/site-copy.md
grep -n "The technology is ready" docs/site-copy.md
```

**After changes:**
```bash
grep -n "invisible infrastructure" docs/site-copy.md
grep -n "The infrastructure" docs/site-copy.md
grep -n "The question is about" docs/site-copy.md
```

**Commit:**
```bash
git add docs/site-copy.md
git commit -m "Polish site copy: eliminate AI-engineering language (8.0→8.5/10)"
```

---

## STEP 3: OPTIONAL POLISH - Blog Post

**File to Edit:**
```
docs/blog/the-human-standard.md
```

**Impact:** 9.0/10 → 9.5/10 score
**Time Required:** 5 minutes

### Change 1: Line 24

**FIND:**
```markdown
What would it mean to design AI systems that operate through these three layers?
```

**REPLACE WITH:**
```markdown
What would it mean to work with intelligence that thinks this way?
```

**Reason:** Shifts from technical architecture ("AI systems") to human experience ("work with intelligence")

---

### Change 2: Line 70

**FIND:**
```markdown
But we're exploring what it could mean if AI systems were built around human cognition rather than around efficient task execution.
```

**REPLACE WITH:**
```markdown
But we're exploring what it could mean to work with intelligence that understands context like a person does.
```

**Reason:** Changes from technical implementation to relational experience

---

### Verification: Blog Post

**Before changes:**
```bash
grep -n "AI systems" docs/blog/the-human-standard.md
# Should show 2 occurrences (lines 24 and 70)
```

**After changes:**
```bash
grep -n "AI systems" docs/blog/the-human-standard.md
# Should show 0 occurrences (if only these two changes were made)
```

**Commit:**
```bash
git add docs/blog/the-human-standard.md
git commit -m "Polish blog post: strengthen human-experience language (9.0→9.5/10)"
```

---

## STEP 4: Verification

### Automated Verification

Run these commands to verify all changes:

```bash
# Verify Blog v2 is deleted
ls docs/The\ Human\ Standard.md 2>&1 | grep -q "No such file" && echo "✅ Blog v2 deleted" || echo "❌ Blog v2 still exists"

# Verify site copy changes (if applied)
grep -q "invisible infrastructure" docs/site-copy.md && echo "✅ Site copy polished" || echo "⚠️  Site copy not polished"

# Verify blog changes (if applied)
! grep -q "AI systems" docs/blog/the-human-standard.md && echo "✅ Blog polished" || echo "⚠️  Blog not polished"

# Check for AI-engineering red flags
echo "Checking for AI-engineering violations..."
grep -i "cognitive architecture\|ontological engine\|translation layer" docs/*.md docs/blog/*.md 2>/dev/null || echo "✅ No critical violations found"
```

---

### Manual Verification

**Quality Checklist:**

**Site Copy** (`docs/site-copy.md`):
- [ ] No instances of "Our translation layer"
- [ ] No instances of "Our infrastructure" (should be "The infrastructure")
- [ ] No instances of "The technology is ready"
- [ ] Focus remains on client elevation and experience
- [ ] AI is tucked beneath surface (invisible metaphor)

**Blog Post** (`docs/blog/the-human-standard.md`):
- [ ] No instances of "AI systems" in lines 24 and 70
- [ ] Language focuses on human experience, not technical architecture
- [ ] AI used as lens for exploring human thinking (not the subject)
- [ ] Philosophical questions about work (not tech explanations)

**Content Removal:**
- [ ] `docs/The Human Standard.md` does not exist
- [ ] Only one blog post remains: `docs/blog/the-human-standard.md`

---

## STEP 5: Final Review

### Voice Compliance Test

Read each document and ask:

**Test 1: Subject Test**
> Is the subject CLIENT EXPERIENCE or AI CAPABILITY?
- ✅ Pass: Client experience
- ❌ Fail: AI capability

**Test 2: Voice Test**
> Would this fit in a work philosophy book or a technical manual?
- ✅ Pass: Philosophy book
- ❌ Fail: Technical manual

**Test 3: Outcome Test**
> After reading, does the audience think about THEIR WORK or OUR TECHNOLOGY?
- ✅ Pass: Their work
- ❌ Fail: Our technology

**Test 4: AI Visibility Test**
> Is AI the vehicle or the destination?
- ✅ Pass: Vehicle (tucked beneath surface)
- ❌ Fail: Destination (front and center)

**Test 5: Relationship Test**
> Does this describe a SERVICE RELATIONSHIP or a TOOL CONFIGURATION?
- ✅ Pass: Service relationship
- ❌ Fail: Tool configuration

**ALL FIVE MUST PASS** for content approval.

---

### Expected Scores After Implementation

| Content | Before | After | Status |
|---------|--------|-------|---------|
| Site Copy | 8.0/10 | 8.5/10 | ✅ Production-ready |
| Blog Post | 9.0/10 | 9.5/10 | ✅ Production-ready |
| Blog v2 | 2.0/10 | DELETED | ✅ Violation removed |

---

## STEP 6: Git Workflow Summary

### Complete Implementation Commands

```bash
# Navigate to project directory
cd /path/to/common-thread-website

# Create feature branch
git checkout -b polish/red-team-improvements

# STEP 1: Delete Blog v2 (REQUIRED)
rm docs/The\ Human\ Standard.md
git add docs/The\ Human\ Standard.md
git commit -m "Remove AI-engineering blog post (rejected by red team audit)"

# STEP 2: Polish site copy (OPTIONAL)
# Make the 3 changes described in STEP 2 above
git add docs/site-copy.md
git commit -m "Polish site copy: eliminate AI-engineering language (8.0→8.5/10)"

# STEP 3: Polish blog post (OPTIONAL)
# Make the 2 changes described in STEP 3 above
git add docs/blog/the-human-standard.md
git commit -m "Polish blog post: strengthen human-experience language (9.0→9.5/10)"

# Push changes
git push origin polish/red-team-improvements

# Create pull request
# Review changes and merge to main
```

---

## Alternative: Use Polished Files Directly

If you prefer, you can replace the existing files with the polished versions provided:

```bash
# Copy polished site copy
cp sessions/session-20251122-183221-common-thread-website/artifacts/run-2-red-team-refactor/final-polish/FINAL_SITE_COPY_V2.md docs/site-copy.md

# Copy polished blog post
cp sessions/session-20251122-183221-common-thread-website/artifacts/run-2-red-team-refactor/final-polish/FINAL_BLOG_V2.md docs/blog/the-human-standard.md

# Delete Blog v2
rm docs/The\ Human\ Standard.md

# Commit all changes
git add -A
git commit -m "Apply red team improvements: polished content (8.5/10, 9.5/10) and remove violations"
```

---

## Rollback Instructions

If you need to undo changes:

```bash
# Rollback all changes
git reset --hard HEAD~3  # Undo last 3 commits

# Or rollback to specific commit
git log  # Find commit hash before changes
git reset --hard <commit-hash>

# Force push if already pushed
git push --force origin polish/red-team-improvements
```

---

## Troubleshooting

### Issue: File not found

**Problem:** `rm: docs/The Human Standard.md: No such file or directory`

**Solution:** File may already be deleted or has different name. Check:
```bash
ls docs/*.md
ls docs/blog/*.md
```

---

### Issue: Changes not showing up

**Problem:** Edit made but grep still shows old content

**Solutions:**
1. Ensure you saved the file after editing
2. Check you're editing the correct file path
3. Verify changes with: `cat docs/site-copy.md | grep -A2 -B2 "invisible infrastructure"`

---

### Issue: Git merge conflicts

**Problem:** Merge conflicts when pulling latest changes

**Solution:**
```bash
# Stash your changes
git stash

# Pull latest
git pull origin main

# Reapply your changes
git stash pop

# Resolve conflicts manually, then commit
```

---

## Quality Assurance Checklist

Before marking complete, verify:

**File Status:**
- [ ] `docs/The Human Standard.md` deleted
- [ ] `docs/site-copy.md` exists (polished or original)
- [ ] `docs/blog/the-human-standard.md` exists (polished or original)

**Content Quality:**
- [ ] No AI-engineering violations (technical architecture language)
- [ ] Client experience focus maintained
- [ ] AI tucked beneath surface (vehicle, not destination)
- [ ] Service relationship language dominates
- [ ] Human outcomes centered

**Git Status:**
- [ ] All changes committed
- [ ] Clear commit messages
- [ ] Branch pushed to remote (if using branches)
- [ ] Ready for pull request/merge

**Voice Compliance:**
- [ ] Site copy passes all 5 voice tests
- [ ] Blog post passes all 5 voice tests
- [ ] No technical manual language
- [ ] Work philosophy exploration maintained

---

## Timeline

**Minimal Implementation (Option A):**
- Delete Blog v2: 1 minute
- **Total:** 1 minute

**Full Polish (Option B):**
- Delete Blog v2: 1 minute
- Polish site copy: 5 minutes
- Polish blog post: 5 minutes
- Verification: 2 minutes
- Git workflow: 2 minutes
- **Total:** 15 minutes

---

## Next Steps After Implementation

1. **Review changes** in your local environment
2. **Run voice compliance tests** to verify quality
3. **Create pull request** for team review (if applicable)
4. **Deploy to staging** for final review
5. **Publish to production** when approved

---

## Support

**Questions about implementation?**
- Review `BEFORE_AFTER_COMPARISON.md` for detailed rationale
- Check `AI_LANGUAGE_ELIMINATION_AUDIT.md` for complete violation analysis
- Refer to polished files (`FINAL_SITE_COPY_V2.md`, `FINAL_BLOG_V2.md`) for exact target content

**Issues with git workflow?**
- Consult your team's git practices
- Use `git status` frequently to track changes
- Create backups before major changes: `cp -r docs docs.backup`

---

**Implementation Guide Version:** 1.0
**Date:** 2025-11-22
**Session:** session-20251122-183221-common-thread-website
**Status:** Ready for Use
