public class TreeDP {

    private int[][] graph;
    private boolean[] visited;
    private int[] subtreeSize;

    public TreeDP(int[][] graph) {

        this.graph = graph;

        visited =
                new boolean[graph.length];

        subtreeSize =
                new int[graph.length];
    }

    public int calculateSubtreeSize(
            int node) {

        for (int i = 0;
             i < visited.length;
             i++) {
            visited[i] = false;
        }

        return dfsSize(node);
    }

    private int dfsSize(int node) {

        visited[node] = true;

        int size = 1;

        for (int next = 0;
             next < graph.length;
             next++) {

            if (graph[node][next] == 1 &&
                    !visited[next]) {

                size += dfsSize(next);
            }
        }

        subtreeSize[node] = size;

        return size;
    }

    public int diameter() {

        int best = 0;

        for (int start = 0;
             start < graph.length;
             start++) {

            int distance =
                    farthestDistance(start);

            if (distance > best) {
                best = distance;
            }
        }

        return best;
    }

    private int farthestDistance(
            int start) {

        int n = graph.length;

        int[] distance =
                new int[n];

        boolean[] seen =
                new boolean[n];

        int[] queue =
                new int[n];

        int front = 0;
        int rear = 0;

        queue[rear++] = start;
        seen[start] = true;

        int maximum = 0;

        while (front < rear) {

            int current =
                    queue[front++];

            for (int next = 0;
                 next < n;
                 next++) {

                if (graph[current][next] == 1 &&
                        !seen[next]) {

                    seen[next] = true;

                    distance[next] =
                            distance[current] + 1;

                    if (distance[next] >
                            maximum) {

                        maximum =
                                distance[next];
                    }

                    queue[rear++] = next;
                }
            }
        }

        return maximum;
    }
}
