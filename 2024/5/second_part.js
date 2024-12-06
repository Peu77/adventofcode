function parseInput(input) {
    const [rulesSection, updatesSection] = input.trim().split('\n\n');

    const rules = new Map();
    rulesSection.split('\n').forEach(rule => {
        const [before, after] = rule.split('|').map(Number);
        if (!rules.has(before)) rules.set(before, new Set());
        rules.get(before).add(after);
    });

    const updates = updatesSection.split('\n').map(update =>
        update.split(',').map(Number)
    );

    return { rules, updates };
}

function isUpdateInCorrectOrder(update, rules) {
    for (let i = 0; i < update.length; i++) {
        for (let j = i + 1; j < update.length; j++) {
            if (rules.has(update[j]) && rules.get(update[j]).has(update[i])) {
                return false;
            }
        }
    }
    return true;
}

function correctUpdateOrder(update, rules) {
    const sortedUpdate = [...update];

    for (let i = 0; i < sortedUpdate.length; i++) {
        for (let j = i + 1; j < sortedUpdate.length; j++) {
            if (rules.has(sortedUpdate[j]) &&
                rules.get(sortedUpdate[j]).has(sortedUpdate[i])) {
                [sortedUpdate[i], sortedUpdate[j]] = [sortedUpdate[j], sortedUpdate[i]];
            }
        }
    }

    return sortedUpdate;
}

function findMiddlePageNumber(update) {
    const middleIndex = Math.floor((update.length - 1) / 2);
    return update[middleIndex];
}

function solvePageOrderingPartTwo(input) {
    const { rules, updates } = parseInput(input);

    let middlePageSum = 0;

    updates.forEach(update => {
        if (!isUpdateInCorrectOrder(update, rules)) {
            const correctedUpdate = correctUpdateOrder(update, rules);
            middlePageSum += findMiddlePageNumber(correctedUpdate);
        }
    });

    return middlePageSum;
}

const exampleInput = `
96|56
68|78
68|96
52|85
52|14
52|76
85|18
85|96
85|13
85|75
64|15
64|75
64|16
64|41
64|49
49|22
49|88
49|56
49|67
49|86
49|78
88|56
88|16
88|29
88|22
88|18
88|41
88|87
33|17
33|14
33|95
33|13
33|85
33|53
33|57
33|39
83|47
83|88
83|77
83|16
83|32
83|68
83|76
83|95
83|99
72|99
72|74
72|76
72|13
72|94
72|47
72|23
72|77
72|93
72|32
57|32
57|53
57|74
57|64
57|47
57|95
57|49
57|58
57|68
57|76
57|75
47|78
47|56
47|17
47|18
47|29
47|52
47|26
47|15
47|96
47|55
47|27
47|64
74|29
74|26
74|22
74|39
74|27
74|15
74|88
74|17
74|64
74|49
74|18
74|16
74|47
56|22
56|63
56|15
56|41
56|91
56|86
56|26
56|27
56|55
56|72
56|29
56|17
56|35
56|67
67|98
67|73
67|12
67|83
67|33
67|23
67|86
67|87
67|72
67|15
67|95
67|79
67|85
67|91
67|39
87|93
87|12
87|14
87|98
87|32
87|86
87|74
87|52
87|72
87|99
87|76
87|73
87|57
87|85
87|23
87|94
12|93
12|96
12|76
12|57
12|49
12|98
12|58
12|73
12|74
12|64
12|32
12|53
12|68
12|13
12|77
12|99
12|85
98|14
98|85
98|75
98|83
98|13
98|23
98|53
98|32
98|95
98|64
98|74
98|77
98|73
98|96
98|57
98|58
98|99
98|93
58|63
58|75
58|88
58|13
58|67
58|49
58|18
58|26
58|47
58|15
58|68
58|77
58|56
58|74
58|78
58|16
58|96
58|14
58|99
32|96
32|88
32|13
32|47
32|68
32|63
32|29
32|49
32|75
32|78
32|26
32|58
32|14
32|41
32|67
32|27
32|74
32|18
32|76
32|16
17|94
17|98
17|13
17|83
17|73
17|95
17|14
17|32
17|86
17|76
17|57
17|53
17|72
17|99
17|87
17|35
17|85
17|52
17|12
17|39
17|58
94|49
94|13
94|47
94|53
94|77
94|57
94|98
94|83
94|73
94|85
94|74
94|14
94|12
94|95
94|32
94|79
94|64
94|93
94|68
94|23
94|76
94|99
22|32
22|86
22|58
22|13
22|52
22|93
22|98
22|94
22|57
22|85
22|39
22|23
22|55
22|72
22|73
22|79
22|35
22|12
22|87
22|17
22|83
22|33
22|95
15|94
15|22
15|91
15|98
15|55
15|57
15|72
15|52
15|83
15|53
15|95
15|12
15|32
15|93
15|86
15|17
15|79
15|23
15|35
15|39
15|87
15|73
15|85
15|33
41|55
41|22
41|86
41|15
41|52
41|79
41|98
41|12
41|93
41|91
41|33
41|57
41|35
41|73
41|87
41|83
41|72
41|17
41|94
41|95
41|53
41|67
41|39
41|23
93|58
93|77
93|56
93|88
93|74
93|64
93|23
93|29
93|49
93|95
93|27
93|32
93|85
93|47
93|78
93|75
93|83
93|13
93|76
93|99
93|68
93|14
93|96
93|53
91|94
91|83
91|32
91|73
91|17
91|23
91|39
91|87
91|58
91|72
91|86
91|12
91|79
91|35
91|85
91|22
91|53
91|98
91|93
91|57
91|95
91|33
91|52
91|55
23|95
23|47
23|76
23|99
23|26
23|53
23|14
23|49
23|77
23|13
23|68
23|74
23|29
23|58
23|64
23|56
23|96
23|85
23|83
23|32
23|27
23|78
23|75
23|88
55|98
55|57
55|52
55|35
55|87
55|79
55|73
55|32
55|95
55|39
55|58
55|23
55|17
55|86
55|72
55|83
55|12
55|53
55|94
55|13
55|14
55|85
55|93
55|99
53|85
53|99
53|49
53|26
53|47
53|88
53|27
53|78
53|83
53|14
53|58
53|56
53|32
53|18
53|75
53|29
53|68
53|95
53|76
53|96
53|74
53|77
53|13
53|64
63|94
63|55
63|53
63|35
63|73
63|83
63|67
63|15
63|57
63|12
63|39
63|72
63|86
63|33
63|41
63|79
63|91
63|98
63|22
63|87
63|23
63|93
63|17
63|52
75|94
75|91
75|87
75|17
75|56
75|27
75|33
75|67
75|78
75|55
75|18
75|86
75|63
75|16
75|52
75|29
75|72
75|22
75|39
75|35
75|26
75|41
75|15
75|88
73|64
73|13
73|74
73|14
73|53
73|93
73|23
73|29
73|76
73|85
73|88
73|68
73|56
73|96
73|75
73|83
73|77
73|58
73|99
73|47
73|57
73|32
73|95
73|49
16|33
16|15
16|72
16|55
16|12
16|93
16|53
16|52
16|22
16|98
16|17
16|39
16|79
16|63
16|41
16|57
16|87
16|91
16|86
16|23
16|35
16|73
16|67
16|94
86|68
86|72
86|83
86|73
86|95
86|93
86|47
86|12
86|13
86|99
86|76
86|74
86|58
86|79
86|98
86|85
86|53
86|23
86|94
86|14
86|32
86|57
86|77
86|35
13|68
13|49
13|63
13|16
13|77
13|88
13|99
13|27
13|67
13|15
13|14
13|74
13|26
13|76
13|64
13|91
13|75
13|78
13|96
13|18
13|41
13|56
13|29
13|47
26|57
26|33
26|87
26|16
26|98
26|94
26|35
26|12
26|18
26|73
26|67
26|52
26|41
26|86
26|79
26|17
26|55
26|63
26|39
26|72
26|15
26|91
26|93
26|22
18|91
18|23
18|87
18|73
18|55
18|67
18|35
18|12
18|94
18|16
18|57
18|15
18|39
18|86
18|63
18|17
18|79
18|22
18|52
18|41
18|72
18|93
18|33
18|98
77|17
77|63
77|26
77|29
77|56
77|74
77|22
77|67
77|88
77|18
77|68
77|75
77|41
77|91
77|47
77|33
77|96
77|16
77|49
77|78
77|55
77|27
77|64
77|15
27|16
27|12
27|41
27|33
27|18
27|57
27|72
27|79
27|87
27|86
27|35
27|15
27|55
27|63
27|39
27|91
27|98
27|94
27|73
27|26
27|52
27|22
27|17
27|67
39|93
39|14
39|86
39|72
39|85
39|76
39|32
39|94
39|52
39|98
39|53
39|87
39|12
39|77
39|35
39|95
39|73
39|13
39|23
39|58
39|57
39|79
39|83
39|99
99|67
99|96
99|77
99|16
99|29
99|26
99|18
99|68
99|91
99|76
99|64
99|75
99|27
99|41
99|22
99|63
99|49
99|78
99|56
99|88
99|74
99|15
99|47
99|33
79|49
79|93
79|23
79|77
79|73
79|83
79|64
79|47
79|98
79|14
79|76
79|85
79|53
79|57
79|99
79|32
79|74
79|13
79|58
79|96
79|75
79|95
79|68
79|12
76|27
76|77
76|22
76|56
76|29
76|49
76|68
76|18
76|64
76|74
76|33
76|41
76|16
76|55
76|15
76|91
76|26
76|78
76|67
76|75
76|96
76|63
76|88
76|47
14|78
14|63
14|75
14|77
14|29
14|15
14|91
14|16
14|76
14|68
14|74
14|27
14|64
14|96
14|56
14|99
14|67
14|88
14|47
14|41
14|22
14|49
14|18
14|26
78|52
78|35
78|15
78|18
78|16
78|67
78|12
78|86
78|63
78|79
78|17
78|22
78|27
78|94
78|39
78|55
78|72
78|73
78|33
78|26
78|91
78|98
78|41
78|87
35|76
35|58
35|14
35|12
35|64
35|79
35|99
35|93
35|98
35|53
35|77
35|47
35|32
35|68
35|94
35|57
35|85
35|73
35|83
35|95
35|23
35|13
35|72
35|74
29|87
29|86
29|26
29|18
29|15
29|35
29|41
29|78
29|52
29|33
29|98
29|72
29|63
29|17
29|67
29|27
29|16
29|79
29|39
29|91
29|55
29|22
29|94
29|12
95|49
95|99
95|56
95|27
95|29
95|26
95|63
95|74
95|47
95|16
95|96
95|18
95|58
95|14
95|88
95|76
95|78
95|13
95|85
95|32
95|75
95|68
95|77
95|64
96|33
96|87
96|18
96|39
96|55
96|17
96|75
96|41
96|15
96|35
96|63
96|88
96|27
96|29
96|86
96|49
96|22
96|78
96|52
96|67
96|16
96|91
96|26
68|88
68|56
68|55
68|63
68|67
68|39
68|16
68|27
68|75
68|49
68|15
68|18
68|29
68|64
68|47
68|87
68|33
68|41
68|22
68|26
68|91
68|17
52|77
52|98
52|68
52|74
52|73
52|99
52|12
52|83
52|53
52|86
52|13
52|57
52|23
52|95
52|72
52|58
52|94
52|93
52|32
52|35
52|79
85|58
85|78
85|27
85|74
85|63
85|56
85|32
85|77
85|16
85|47
85|64
85|68
85|26
85|29
85|99
85|88
85|14
85|49
85|41
85|76
64|17
64|52
64|27
64|33
64|29
64|55
64|22
64|96
64|91
64|78
64|18
64|26
64|67
64|88
64|56
64|86
64|63
64|87
64|39
49|18
49|27
49|63
49|33
49|16
49|26
49|72
49|87
49|52
49|41
49|75
49|29
49|35
49|17
49|15
49|55
49|91
49|39
88|33
88|27
88|39
88|72
88|35
88|26
88|63
88|17
88|15
88|86
88|91
88|78
88|67
88|94
88|79
88|55
88|52
33|32
33|12
33|93
33|55
33|52
33|94
33|86
33|98
33|83
33|23
33|35
33|72
33|87
33|58
33|73
33|79
83|75
83|29
83|13
83|96
83|49
83|26
83|78
83|14
83|64
83|18
83|56
83|27
83|85
83|74
83|58
72|14
72|95
72|68
72|79
72|98
72|53
72|12
72|96
72|64
72|58
72|57
72|85
72|83
72|73
57|56
57|99
57|13
57|78
57|96
57|29
57|14
57|88
57|23
57|93
57|77
57|83
57|85
47|39
47|91
47|16
47|75
47|67
47|33
47|49
47|22
47|63
47|88
47|87
47|41
74|63
74|67
74|56
74|91
74|33
74|55
74|41
74|75
74|96
74|78
74|68
56|16
56|12
56|87
56|52
56|18
56|39
56|33
56|79
56|78
56|94
67|17
67|94
67|57
67|93
67|53
67|22
67|55
67|52
67|35
87|13
87|77
87|79
87|83
87|58
87|53
87|35
87|95
12|14
12|47
12|83
12|88
12|75
12|95
12|23
98|88
98|49
98|47
98|68
98|76
98|56
58|27
58|29
58|41
58|76
58|64
32|99
32|77
32|64
32|56
17|93
17|79
17|23
94|96
94|58
22|53

49,85,73,74,96,32,76,58,95,57,13,93,14,99,56,47,75
74,68,64,75,78,18,41,67,15
83,95,85,32,58,14,76,77,74,68,47,96,49,75,88,56,29,78,18
91,33,55,17,39,87,52,86,35,72,94,79,12,98,93,53,83,95,85
12,57,93,23,53,83,95,85,58,14,99,68,64,49,75
96,27,17,64,78,16,56,63,18,87,33,75,22,88,49,91,67,41,55,39,15,29,47
83,33,91,98,93,57,15,72,79,95,73,23,52,87,39,22,86
33,88,27,15,64,63,49,26,87,55,91,22,39,16,29,78,47,41,67,96,17,18,75
22,33,55,17,39,52,86,94,73,23,53,83,95,85,32
67,56,39,52,94,33,22,78,27,18,29,35,63,87,86,26,79
88,68,77,41,33,56,16,74,75,29,47,78,67,63,64,49,18
41,67,15,91,22,33,55,17,39,86,79,12,98,73,57,93,53
52,99,23,73,35,72,87,12,77
85,83,91,23,94,39,33,15,35
55,35,22,86,56,78,15,39,88,94,87,18,17,52,91
79,53,85,58,74,68,49
53,99,79,98,95,12,47,14,64,13,32,85,83,77,23,76,93
56,29,27,26,16,63,22,17,72,94,79
49,88,56,29,18,16,63,41,15,33,39,52,35
33,55,17,39,87,35,72,94,79,12,98,73,57,93,83,95,85,32,13
67,15,73,33,93,91,12,79,41,57,63,55,22,86,98,35,72,94,16
86,33,95,72,79,13,39,57,93,87,83,23,53,85,17,98,94,73,12
87,58,35,94,22,86,72,52,85
39,52,86,35,94,93,53,83,95,85,32,58,14,99,76
96,49,75,88,78,27,26,18,16,63,41,67,15,91,22,33,17,87,86
53,83,14,99,47,96,49
99,23,98,64,77,57,12,74,47,76,75,96,32,49,68,53,93,13,73,83,95
15,22,17,39,87,86,35,73,93,53,83,95,85
33,12,35,86,39,22,17,15,57,87,53,91,98,94,93,95,67,72,73,83,79
76,77,74,68,47,64,96,49,75,88,56,78,27,26,18,16,63,41,67,15,91,22,33
99,76,77,74,68,96,49,75,88,56,78,27,26,18,16,63,41,67,15,91,22
57,75,76,99,64,13,93
86,35,72,52,23,73,15,53,39,12,55,79,33,93,17,83,67,94,57,22,41,87,98
14,99,76,77,74,64,75,88,56,26,63
64,14,99,85,53,98,47,57,83,93,72,77,95,94,73,76,13
52,35,94,79,12,98,73,57,93,23,53,83,95,85,58,13,14,99,76,77,74
93,94,99,96,98,85,79,23,58
64,56,29,18,63,41,67,91,22,55,52
58,13,14,99,77,74,47,64,96,49,75,88,56,29,78,26,18,63,67
17,53,22,12,58,93,83
83,32,77,74,96,78,18
56,47,58,88,75,49,27,95,26,85,78,99,74,77,68,18,29,76,16,13,32
56,29,78,18,63,41,67,15,91,22,55,17,39,87,52,35,72,94,79
16,41,33,55,72,79,73,93,23
13,76,57,49,95,58,32,23,14,75,77,53,47,85,56,64,96
93,53,83,58,76,77,68,96,49,75,88,56,78
35,72,79,12,98,73,93,23,83,95,85,58,14,99,76,77,74,68,47
88,56,29,78,27,26,18,63,41,67,15,91,22,33,55,17,39,87,52,86,35,72,94
98,53,32,58,76
88,56,78,27,26,18,16,41,67,15,91,33,17,39,87,52,86,72,94
29,96,85,23,56,95,83,76,47,64,78,77,74,49,53,58,75
53,83,95,85,32,58,13,14,99,76,74,47,49,75,88,56,29,78,27
55,33,23,79,95,72,85,86,15,73,17,39,52,91,98,93,12
94,79,12,98,73,93,53,83,95,85,32,14,99,76,68,64,96
22,55,17,39,87,52,35,72,94,79,12,98,73,57,93,23,95,85,58
77,74,68,64,96,49,75,88,29,78,27,26,18,16,63,41,67,15,91,33,55
78,93,76,99,68,96,49
99,76,74,68,64,27,26,41,22
18,49,56,29,63,75,68,55,91,27,15
56,78,27,26,18,16,63,41,67,15,91,33,55,87,52
64,88,29,18,91,55,17,39,52
77,74,68,47,64,96,49,75,88,29,78,27,26,18,16,63,67,15,91,22,33
57,67,73,87,35,95,86
49,93,68,74,95,32,57,29,64,75,14,13,53,77,96
74,68,47,64,49,75,88,56,29,78,27,26,18,16,63,41,91,22,33,55,17
39,52,49,26,22,33,78
26,63,91,55,17,39,86,72,94,79,57
94,52,53,87,32,33,57,13,39,85,79,95,35,86,12,23,98
23,72,14,98,57,64,12,13,93,47,95,68,85,79,73
26,67,18,39,33,16,78,49,15,56,96,63,75,68,91
14,63,74,99,64,15,88
55,16,41,67,49,22,39,56,17,29,63,33,26,68,96
55,63,67,27,79,78,87,41,56,15,86,22,91,17,18
22,55,17,39,35,72,94,98,73,93,23,83,58
73,57,23,53,83,58,13,14,76,47,75
12,98,73,57,93,23,53,83,85,32,58,13,14,99,76,74,68,47,96,49,75
39,79,98,57,83,14,76
53,76,77,68,49,88,56,27,26
72,57,95,58,13,47,64
64,88,29,78,26,16,63,15,91,55,17,39,52
83,95,85,58,13,14,99,76,77,74,68,47,64,96,49,56,78,27,18
95,85,32,58,13,14,99,76,77,74,47,64,96,49,75,88,56,29,78,27,26,18,16
64,96,49,75,88,56,29,78,27,26,18,16,63,67,15,22,17,39,52
22,53,72,23,73,33,63
12,52,76,95,74,72,73
73,57,93,23,53,83,95,85,32,58,13,14,99,76,77,74,47,64,96,49,75
14,83,98,68,75,88,49,93,57,99,85
17,39,52,35,72,94,79,12,98,73,93,23,53,83,95,58,13,14,99
16,91,87,22,15,41,88,96,78,17,33,86,26,67,75,29,18,27,49
18,41,22,33,16,12,91,87,35,72,15,52,93
78,75,85,76,13,32,56,29,88,93,68,47,49,77,53,58,74,14,96,99,83
96,85,58,53,77,26,56,13,64,75,99,49,47,88,68,14,83,27,74,78,95,32,76
35,94,79,73,23,53,83,95,32,58,74
74,29,17,33,16,64,27,47,75
35,17,52,91,27,56,18,22,16,39,63
17,39,35,15,23,22,52,12,94,73,41,93,33,91,98,79,67,86,55,72,87
55,17,39,87,52,86,35,94,12,98,57,93,23,53,95,32,58
98,53,99,68,85,83,47,64,76,75,58,95,49,13,96,32,88,57,77
23,53,32,58,77,74,68,47,96,49,88,56,29,78,27
91,27,15,41,75,68,67,26,29,56,49,76,14
76,77,74,68,47,64,75,29,78,27,26,16,63,41,67,15,91,22,33
27,26,63,15,17,52,35,94,12
68,49,63,41,15,91,39
41,67,15,91,33,55,17,39,87,52,35,72,94,79,12,93,23,53,83
98,93,77,74,13,64,14,68,95,96,83,99,12,94,53,79,85,58,73
85,88,78,32,99,49,26,64,76
88,56,29,78,26,16,63,41,67,15,91,33,17,39,87,52,35,72,94
16,67,56,77,33,91,96,75,29,63,76,15,64,27,78,22,26,49,88,18,41
68,47,64,96,49,75,56,78,27,26,18,16,63,41,67,15,22,33,55,17,39
41,15,52,35,72,98,73,57,23,53,83
53,23,98,47,95
39,52,67,57,93,15,98,91,17,16,94,55,41,18,73
17,86,35,79,73,57,53,95,32,58,13,14,99
26,75,32,49,64,53,47,88,99,77,68,85,96,29,76,14,58
49,58,63,27,13,32,77,76,26,41,29,99,14
35,79,83,13,76,68,47
77,12,99,87,98,32,53
23,53,95,85,58,13,14,99,77,68,96,75,88,56,29,78,27
63,13,88,75,96,77,67,47,16,76,74,56,64,14,58
77,74,68,26,18,67,91
16,67,91,56,33,29,18,41,17,26,86,78,22,96,52,75,49,39,63,55,27
41,67,15,91,17,87,52,72,94,79,98,73,57,93,23,53,83
56,29,78,67,55,87,35,94,79
14,47,88,63,68,16,27,76,75,32,85,99,18,26,96,49,13,58,29,74,77
47,95,58,13,98,99,77,64,68,93,12,57,53,85,74,73,72,32,94
94,93,12,68,14,74,85,98,83,86,32,77,79,57,76,72,73,23,95
63,41,67,15,55,72,94,79,12,98,73,57,93,23,53
53,83,95,85,32,58,13,14,99,76,77,68,47,64,96,49,75,88,56,29,78,27,26
99,76,68,47,64,96,49,75,88,29,78,16,67
39,15,26,22,94,79,63,35,73,72,18,52,33,57,12,55,16
63,41,67,15,91,33,55,17,39,86,35,72,94,79,12,98,73,57,93,23,53
52,86,35,72,98,73,57,83,32,58,14,77,74
18,16,63,41,67,15,91,22,33,55,39,86,72,94,12,98,73,57,93
56,96,85,58,13,32,75,23,95,77,14,76,83,53,93,73,68
93,13,74,58,12,83,35,68,73,86,23,77,53,94,72,98,79,95,57,99,32,14,76
39,52,94,73,93
16,63,78,98,52,39,22,87,33
35,63,16,91,52,86,41,27,73,55,17,12,98,67,33,22,79,39,15
26,72,55,12,78,52,41,35,63,17,27,94,22,29,67,91,87
35,16,15,78,72,56,22,26,67,55,18,86,33,88,94,87,41,29,63,39,91,27,17
52,41,63,49,17,56,87,18,75,16,33,96,64,91,67
39,53,58,93,57,23,72,83,17,86,94,35,99,85,73,87,12,13,95,98,52
93,53,83,85,32,58,14,68,49,88,56,29,78
98,73,57,93,23,53,83,95,85,58,14,99,77,64,96,75,88
52,86,72,12,98,23,32,58,13,14,76
78,76,74,96,99,47,41,64,77,32,88
79,98,57,53,58,74,47,96,49
13,14,99,76,77,74,68,47,64,96,49,88,56,29,78,27,26,18,16,63,41,67,15
86,72,22,15,39,33,78,41,87,35,55,94,67,17,12,91,79,29,63
12,67,93,53,63,55,22,39,23,72,94,35,91,98,79,41,17,57,15
29,78,27,26,18,16,63,41,67,15,91,22,33,55,39,87,52,86,35,72,94,79,12
52,86,35,94,79,12,73,57,93,23,53,95,85,32,13,14,99,76,74
68,64,63,75,56,32,41
47,75,16,56,67,87,41
86,35,72,94,79,12,98,73,57,23,53,83,95,85,32,58,13,14,99,76,77,74,68
56,78,26,18,63,15,35,94,79
93,23,83,95,85,58,14,99,76,77,74,47,75,88,56,29,78
91,15,39,29,56,35,41,86,18,87,22,75,52,72,63,17,33,27,55,88,78
75,88,78,26,67,91,17,87,52
35,94,98,17,72,32,58,39,95,13,86,73,14,52,83,12,93,53,85,23,79,87,57
12,73,57,93,23,83,85,32,58,13,14,99,76,77,74,47,96,49,75
32,74,77,23,99,52,57,35,14,76,95,86,53
56,99,49,75,27,74,77,63,96,29,47,91,67,22,26,41,88
64,14,49,77,68,47,78,76,13,27,26
35,72,79,12,73,57,83,58,14,99,74,68,47
68,47,64,96,49,75,56,29,78,27,26,63,41,67,15,91,22,33,55,17,39
17,72,23,22,85,79,87,58,73,12,35,55,86,94,32,95,83,93,98,33,39
83,68,14,75,77,76,56,18,13
15,79,35,52,33,16,91,22,41,27,78,63,94,17,98,67,39,18,72,87,55
95,58,72,13,98,35,79,94,55,86,32,52,57,73,12,17,83
67,64,75,22,33,56,55,68,49
63,41,67,15,91,55,17,39,86,72,94,79,98,57,23
57,93,23,53,83,95,85,32,58,14,99,76,77,74,68,47,64,96,49,75,88,56,29
32,58,83,85,72,79,73,87,52
49,75,88,56,29,27,26,18,16,41,67,15,91,22,33,55,17,39,87,52,35
41,39,98,18,16,91,17,33,87,35,55,79,94,73,27,26,63,12,67,15,52
91,17,86,41,72,75,88
91,55,17,52,35,72,12,98,73,57,93,23,53,83,32
88,78,35,33,52,41,15,91,22,39,67,18,56,94,72,55,87,27,29
35,72,79,12,98,57,93,23,83,85,32,58,13,14,99,76,77,68,47
13,74,14,77,83,53,23,47,95,32,96,85,88,56,73,68,57,58,93,76,99
75,58,88,77,99,13,18,96,49,85,68,47,14,64,74,76,16,78,29,63,56
13,68,78,53,76,96,47,58,29,32,85,27,88,64,75
57,83,74,79,32,64,96,13,95,76,14,53,73,85,47,77,98,68,93,94,58,12,99
17,22,35,86,29,39,55,26,91,33,67,75,87,18,16,27,56
78,87,17,29,18,86,41,72,79,63,67,26,55,94,35,39,12,22,91,52,27,33,16
17,87,86,35,72,12,98,73,57,23,53,83,95,85,32,58,13,14,99
58,13,14,99,76,77,74,68,47,64,96,49,75,88,56,29,78,27,18,16,63,41,67
16,76,96,88,78,63,68,13,75,49,32,18,27,74,47,64,58,41,26,99,56,29,77
91,52,41,15,26,72,67,87,18,63,17,73,33
74,68,47,96,49,75,88,56,29,18,16,63,41,55,17
64,26,49,13,77,58,85,74,18,78,96,95,32,14,99,83,76
55,17,39,87,52,35,72,94,79,12,98,73,57,93,23,53,83,95,85,13,14
39,52,35,72,94,79,73,23,53,83,95,32,13,14,76
91,55,17,52,86,72,12,73,53,83,32
99,76,77,74,68,64,96,49,88,56,29,78,26,18,63,41,67,15,91
22,23,35,67,72,94,16,33,55
13,14,76,77,74,64,29,27,26,41,15
12,73,68,96,13,74,76,99,32,14,57,85,53,58,64,47,77,23,49,75,83,98,95`;

console.log(solvePageOrderingPartTwo(exampleInput));