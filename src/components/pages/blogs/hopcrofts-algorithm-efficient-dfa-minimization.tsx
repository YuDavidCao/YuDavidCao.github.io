import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const imgBase = "/hopcrofts-algorithm-efficient-dfa-minimization";
const heroImg = `${imgBase}/4.png`;

function BlogImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full object-cover rounded-lg mb-6 shadow dark:shadow-gray-800"
      loading="lazy"
    />
  );
}

const hopcroftCode = `def hopcroft_minimize(states, alphabet, transitions, start, accepting):
    """
    Minimize a DFA using Hopcroft's algorithm.

    Hopcroft's algorithm works by iteratively refining a partition of states
    into equivalence classes. Two states are "equivalent" if no input string
    can distinguish them (i.e., cause one to accept and the other to reject).

    The algorithm starts with the coarsest useful partition — accepting vs.
    rejecting states — and repeatedly splits groups whenever some input symbol
    reveals that members of the group behave differently with respect to an
    existing partition block (the "splitter").

    Time complexity: O(|alphabet| · |states| · log |states|), achieved by
    always adding the smaller half of a split to the worklist.

    Args:
        states:      set of all DFA states (e.g. {0, 1, 2, 3, 4})
        alphabet:    set of input symbols (e.g. {'a', 'b'})
        transitions: dict mapping (state, symbol) -> state — must be total
                     (every state/symbol pair must have an entry)
        start:       the start state (a single element from \`states\`)
        accepting:   set of accepting (final) states, a subset of \`states\`

    Returns:
        A 5-tuple (states, alphabet, transitions, start, accepting)
        representing the minimized DFA, using the smallest-numbered member
        of each equivalence class as the canonical representative.
    """
    # The initial partition separates accepting from rejecting (non-accepting)
    # states. This is the base case: we *know* these two groups are
    # distinguishable (the empty string distinguishes them).
    rejecting = states - accepting

    # \`partition\` holds the current set of equivalence classes.
    # Each class is a frozenset of states believed to be equivalent.
    partition = set()
    if accepting:
        partition.add(frozenset(accepting))
    if rejecting:
        partition.add(frozenset(rejecting))

    # \`worklist\` tracks which groups still need to be tried as splitters.
    # A "splitter" is a group we use to test whether other groups can be
    # refined: if some states in a group transition into the splitter on a
    # given symbol and others don't, that group must be split.
    worklist = set()
    if len(accepting) < len(rejecting):
        worklist.add(frozenset(accepting))
    else:
        worklist.add(frozenset(rejecting))

    # Precompute inverse (backward) transitions for efficiency.
    # predecessors[(q, a)] = {set of states that transition to q on symbol a}
    # This lets us quickly find, for a given splitter, which states lead
    # into it — without scanning the entire transition table each time.
    predecessors = {}
    for (source, symbol), target in transitions.items():
        predecessors.setdefault((target, symbol), set()).add(source)

    # Main refinement loop: keep refining until no splitter can cause
    # any further splits (i.e., the partition has stabilized).
    while worklist:
        splitter = worklist.pop()

        # Try each symbol independently — a group might need splitting
        # with respect to one symbol but not another.
        for symbol in alphabet:
            # Gather every state that, on this symbol, transitions into
            # some state in the splitter. We're asking: "Who can reach
            # the splitter in one step on this symbol?"
            sources_into_splitter = set()
            for state in splitter:
                sources_into_splitter |= predecessors.get((state, symbol), set())

            # If no state transitions into the splitter on this symbol,
            # there's nothing to distinguish — skip.
            if not sources_into_splitter:
                continue

            # Walk through every current group and check whether the
            # splitter divides it. We build a fresh partition each time
            # because groups may be added or removed during splitting.
            updated_partition = set()
            for group in partition:
                # Intersect: states in this group that DO reach the splitter
                states_that_reach_splitter = group & sources_into_splitter
                # Difference: states in this group that do NOT reach it
                states_that_dont = group - sources_into_splitter

                if states_that_reach_splitter and states_that_dont:
                    # ---- Split required ----
                    # These two subsets behave differently on \`symbol\` with
                    # respect to the splitter, so they can't be equivalent.
                    updated_partition.add(frozenset(states_that_reach_splitter))
                    updated_partition.add(frozenset(states_that_dont))

                    if group in worklist:
                        # The unsplit group was already queued as a future
                        # splitter. Replace it with both halves so we don't
                        # miss any refinement its sub-parts might cause.
                        worklist.discard(group)
                        worklist.add(frozenset(states_that_reach_splitter))
                        worklist.add(frozenset(states_that_dont))
                    else:
                        # The group wasn't in the worklist. A key insight of
                        # Hopcroft's algorithm: we only need to add the
                        # *smaller* half. The larger half's contribution is
                        # already accounted for by the fact that the original
                        # group was previously processed. This is what gives
                        # the algorithm its O(n log n) per-symbol complexity.
                        if len(states_that_reach_splitter) <= len(states_that_dont):
                            worklist.add(frozenset(states_that_reach_splitter))
                        else:
                            worklist.add(frozenset(states_that_dont))
                else:
                    # ---- No split ----
                    # Every state in the group agrees (all reach the splitter
                    # or none do), so the group stays intact.
                    updated_partition.add(group)

            partition = updated_partition

    # ---- Build the minimized DFA from the final partition ----
    # Choose a canonical representative for each equivalence class.
    # We pick the smallest-numbered state for determinism and readability.
    state_to_representative = {}
    for group in partition:
        representative = min(group)
        for state in group:
            state_to_representative[state] = representative

    # The minimized state set is just the set of representatives.
    minimized_states = {state_to_representative[s] for s in states}

    # The start state maps to whatever representative its class has.
    minimized_start = state_to_representative[start]

    # A representative is accepting if any (equivalently, all) members
    # of its class were accepting in the original DFA.
    minimized_accepting = {state_to_representative[s] for s in accepting}

    # Rebuild the transition function over representatives.
    # Duplicate entries (from merged states) will map to the same value,
    # so simple overwriting is fine.
    minimized_transitions = {}
    for (source, symbol), target in transitions.items():
        new_source = state_to_representative[source]
        new_target = state_to_representative[target]
        minimized_transitions[(new_source, symbol)] = new_target

    return minimized_states, alphabet, minimized_transitions, minimized_start, minimized_accepting`;

export function HopcroftsAlgorithmEfficientDfaMinimization() {
  return (
    <>
      <title>Hopcroft&apos;s Algorithm: Efficient DFA Minimization</title>
      <meta
        name="description"
        content="An in-depth walkthrough of Hopcroft's Algorithm for DFA minimization — partition refinement, a worked example, full Python implementation, and O(n·s·log n) complexity analysis."
      />
      <meta
        property="og:title"
        content="Hopcroft's Algorithm: Efficient DFA Minimization"
      />
      <meta
        property="og:description"
        content="An in-depth walkthrough of Hopcroft's Algorithm for DFA minimization — partition refinement, a worked example, full Python implementation, and O(n·s·log n) complexity analysis."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/hopcrofts-algorithm-efficient-dfa-minimization"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Hopcroft's Algorithm: Efficient DFA Minimization"
          date="May 30, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Hopcroft's Algorithm: Efficient DFA Minimization Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Introduction
          </h2>
          <p className="mb-4">
            Deterministic Finite Automata (DFAs) are fundamental computational
            models used in areas such as compilers, lexical analyzers, pattern
            matching, and formal language processing. A DFA processes an input
            string one symbol at a time and transitions between states according
            to a fixed set of rules. Because every state has exactly one
            outgoing transition for each symbol in the alphabet, the automaton
            behaves deterministically.
          </p>
          <p className="mb-4">A DFA consists of:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>A set of states</li>
            <li>An input alphabet Σ</li>
            <li>A transition function δ</li>
            <li>A start state q₀</li>
            <li>A set of accepting states F</li>
          </ul>
          <p className="mb-4">An example of a DFA:</p>
          <BlogImage
            src={`${imgBase}/1.png`}
            alt="Example DFA with start state q₀, accepting states q₀ and q₁, and rejecting state q_REJ"
          />
          <p className="mb-4">
            As DFAs become larger, they may contain states that are redundant or
            equivalent. These states can be merged without changing the language
            recognized by the automaton. The process of finding the smallest
            equivalent DFA is known as DFA minimization. In our presentation, we
            explored Hopcroft&apos;s Algorithm, one of the most efficient
            algorithms for performing this task.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The DFA Minimization Problem
          </h2>
          <p className="mb-4">
            The objective of DFA minimization is simple: reduce the number of
            states while preserving the exact same behavior.
          </p>
          <p className="mb-4">
            Two states are considered equivalent if, for every possible input
            string, they either both accept or both reject. If two states behave
            identically under all future inputs, there is no need to keep them
            separate. For example, given the following DFA:
          </p>
          <BlogImage
            src={`${imgBase}/2.png`}
            alt="Example DFA before minimization"
          />
          <p className="mb-4">It can be minimized into:</p>
          <BlogImage
            src={`${imgBase}/3.png`}
            alt="The same DFA after minimization, with equivalent states merged"
          />
          <p className="mb-4">
            A naive solution compares every pair of states to determine
            equivalence. While straightforward, this approach requires quadratic
            time and becomes inefficient for large automata. Hopcroft&apos;s
            Algorithm solves the same problem much more efficiently through
            repeated partition refinement.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Core Idea: Partition Refinement
          </h2>
          <p className="mb-4">
            Instead of comparing states directly, Hopcroft&apos;s Algorithm
            groups states into partitions.
          </p>
          <p className="mb-4">
            Initially, states are separated into two categories:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Accepting states</li>
            <li>Non-accepting states</li>
          </ul>
          <p className="mb-4">
            Since accepting and non-accepting states clearly behave differently,
            they can never belong to the same equivalence class.
          </p>
          <p className="mb-4">
            The algorithm then repeatedly examines whether states within a
            partition truly behave the same. Whenever differences are found, the
            partition is split into smaller groups. This process continues until
            no further splits are possible. At that point, each partition
            represents a single state in the minimized DFA.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Example DFA
          </h2>
          <p className="mb-4">Consider the DFA:</p>
          <BlogImage
            src={`${imgBase}/4.png`}
            alt="Six-state example DFA with states q₀ through q₅ used for the Hopcroft's algorithm walkthrough"
          />

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Step 1: Initial Partitioning
          </h3>
          <p className="mb-4">We begin by creating two partitions:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>S₁ = {"{q₀, q₁, q₃, q₄}"}</li>
            <li>S₂ = {"{q₂, q₅}"}</li>
          </ul>
          <p className="mb-4">
            Hopcroft&apos;s Algorithm maintains a worklist containing partitions
            that will be used as splitters. To improve efficiency, the smaller
            partition is selected first.
          </p>
          <p className="mb-4">Worklist = {"{S₂}"}</p>
          <BlogImage
            src={`${imgBase}/5.png`}
            alt="Initial partition of the example DFA into accepting and non-accepting groups with worklist S₂"
          />

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Step 2: Using a Splitter
          </h3>
          <p className="mb-4">
            The algorithm removes S₂ from the worklist and uses it as the
            current splitter. We now determine which states transition into S₂ on
            each input symbol.
          </p>
          <p className="mb-4">
            <strong>For symbol 0:</strong> No states go to q₂ or q₅.
          </p>
          <p className="mb-4">
            <strong>For symbol 1:</strong> X = {"{q₂, q₃, q₄, q₅}"} — all states
            that reach either q₂ or q₅ when reading a 1.
          </p>
          <BlogImage
            src={`${imgBase}/6.png`}
            alt="States that transition into splitter S₂ on input symbol 1"
          />
          <p className="mb-4">
            Next, we compare X with the current partitions. Notice that S₁ ={" "}
            {"{q₀, q₁, q₃, q₄}"} — only q₃ and q₄ belong to X. Since some states
            in S₁ transition into the splitter while others do not, the states
            inside S₁ behave differently. Therefore, S₁ must be split.
          </p>
          <p className="mb-4">The new partitions become:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>S₁ = {"{q₃, q₄}"}</li>
            <li>S₂ = {"{q₂, q₅}"}</li>
            <li>S₃ = {"{q₀, q₁}"}</li>
          </ul>
          <BlogImage
            src={`${imgBase}/7.png`}
            alt="Updated partitions after splitting S₁ into {q₃, q₄} and {q₀, q₁}"
          />
          <p className="mb-4">
            This is the key insight of Hopcroft&apos;s Algorithm: states remain
            together only if they react identically to every splitter.
          </p>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Step 3: Continue Refinement
          </h3>
          <p className="mb-4">
            The partition {"{q₃, q₄}"} is added to the worklist and becomes the
            next splitter.
          </p>
          <p className="mb-4">
            <strong>For symbol 0:</strong> X = {"{q₃, q₄}"}. Since every state
            in partition S₁ belongs to X, no split occurs. The remaining
            partitions also remain unchanged.
          </p>
          <BlogImage
            src={`${imgBase}/8.png`}
            alt="No partition split occurs for input symbol 0 when X equals {q₃, q₄}"
          />
          <p className="mb-4">
            <strong>For symbol 1:</strong> X = {"{q₀, q₁}"}. Again, no partition
            contains a mixture of states inside and outside X, so no split is
            necessary.
          </p>
          <BlogImage
            src={`${imgBase}/9.png`}
            alt="No partition split occurs for input symbol 1 when X equals {q₀, q₁}"
          />
          <p className="mb-4">
            At this point, no additional partitions need refinement. The
            worklist becomes empty, and the algorithm terminates.
          </p>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Final Partitions
          </h3>
          <p className="mb-4">The final partition set is:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>{"{q₃, q₄}"}</li>
            <li>{"{q₂, q₅}"}</li>
            <li>{"{q₀, q₁}"}</li>
          </ul>
          <p className="mb-4">
            Each partition represents a set of equivalent states. Therefore, the
            original six-state DFA can be reduced to a three-state DFA. The
            minimized transition table becomes:
          </p>
          <BlogImage
            src={`${imgBase}/10.png`}
            alt="Minimized three-state DFA transition table"
          />

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Implementation Details
          </h2>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Initial Partitioning
          </h3>
          <p className="mb-4">The algorithm begins by:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Creating accepting and non-accepting partitions.</li>
            <li>Adding the smaller partition to the worklist.</li>
            <li>Building a predecessor map for efficient lookups.</li>
          </ol>
          <p className="mb-4">
            Instead of storing transitions as q₀ — 1→ q₂, we store reverse
            transitions: (q₂, 1) → {"{q₀}"}. This allows us to quickly determine
            which states transition into a splitter.
          </p>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Splitting Partitions
          </h3>
          <p className="mb-4">For each splitter and input symbol:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Find X, the set of states that transition into the splitter.</li>
            <li>Compare X against each partition.</li>
            <li>
              Split any partition that contains states both inside and outside X.
            </li>
          </ol>
          <p className="mb-4">
            This process gradually refines the partitions until every state in a
            partition behaves identically.
          </p>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Worklist Updates
          </h3>
          <p className="mb-4">Whenever a partition is split:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              If the original partition is already in the worklist, replace it
              with both resulting partitions.
            </li>
            <li>Otherwise, add only the smaller partition.</li>
          </ul>
          <p className="mb-4">
            This optimization is what gives Hopcroft&apos;s Algorithm its
            excellent performance.
          </p>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Full Python Code
          </h3>
          <CodeBlock language="python" code={hopcroftCode} />

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Complexity Analysis
          </h2>
          <p className="mb-4">
            Hopcroft&apos;s Algorithm has a worst-case time complexity of{" "}
            <strong>O(n·s·log n)</strong>, where n is the number of states and s
            is the size of the input alphabet.
          </p>
          <p className="mb-4">
            The logarithmic factor arises because the algorithm repeatedly adds
            only the smaller partition to the worklist, ensuring that states are
            processed a limited number of times. We can think about it by asking:
            how many times will each state be processed in total? By adding only
            the smaller partition, we halve the number of states needed to be
            processed each time, resulting in each state needing to be processed
            at most log n times.
          </p>
          <p className="mb-4">
            Note: Hopcroft usually runs faster than O(n·s·log n) in practice,
            due to uneven distribution of the duplicated states.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Why It Matters
          </h2>
          <p className="mb-4">
            DFA minimization has important real-world applications. Smaller DFAs
            require less memory, execute faster, and improve performance in
            lexical analyzers and compilers.
          </p>
          <p className="mb-4">
            For example, lexical analyzers scan every character of a source
            program using DFAs. Reducing the size of these automata can
            significantly improve efficiency when processing large amounts of
            code. Hopcroft&apos;s Algorithm enables this optimization while
            remaining practical even for large automata.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Conclusion
          </h2>
          <p className="mb-4">
            Hopcroft&apos;s Algorithm is one of the most elegant and efficient
            solutions to the DFA minimization problem. Rather than comparing
            states individually, it repeatedly refines partitions of states using
            carefully chosen splitters. By always processing the smaller
            partition, the algorithm achieves an impressive O(n·s·log n) runtime
            while guaranteeing the construction of a minimal DFA.
          </p>
          <p className="mb-4">
            Through partition refinement, equivalent states are identified and
            merged, producing a smaller automaton that recognizes exactly the
            same language. This combination of theoretical elegance and
            practical efficiency is why Hopcroft&apos;s Algorithm remains the
            standard approach for DFA minimization in modern compiler and
            automata implementations.
          </p>
          <p className="mb-4">
            This is a final project for University of Virginia&apos;s Advanced
            Data Structures and Algorithms class. Credits to my teammates Brian
            and Yog, and to Prof. Mark Floryan. More detail about this project
            including full code for Python, Java, and C++ with a programming
            challenge can be found at{" "}
            <a
              href="https://markfloryan.github.io/advalgo_projects_sp26/projects/13-Hopcroft/index.html"
              className="text-sepia dark:text-dark-sepia underline"
            >
              the project page
            </a>
            .
          </p>
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/hopcrofts-algorithm-efficient-dfa-minimization-fabbaf5fe975" />
      </div>
    </>
  );
}
