public class Trie {

    private static class Node {

        Node[] children;
        boolean isWord;

        Node() {
            children = new Node[128];
            isWord = false;
        }
    }

    private Node root;

    public Trie() {
        root = new Node();
    }

    public void insert(String word) {

        word = word.toLowerCase();

        Node current = root;

        for (int i = 0;
             i < word.length();
             i++) {

            char c = word.charAt(i);

            if (c >= 128) {
                continue;
            }

            if (current.children[c] == null) {

                current.children[c] =
                        new Node();
            }

            current =
                    current.children[c];
        }

        current.isWord = true;
    }

    public boolean contains(String word) {

        Node node =
                findNode(word);

        return node != null &&
                node.isWord;
    }

    public void printSuggestions(
            String prefix) {

        Node node =
                findNode(prefix);

        if (node == null) {
            System.out.println(
                    "No suggestions.");
            return;
        }

        System.out.println(
                "Suggestions:");

        collect(node,
                prefix.toLowerCase());
    }

    private Node findNode(String word) {

        word = word.toLowerCase();

        Node current = root;

        for (int i = 0;
             i < word.length();
             i++) {

            char c = word.charAt(i);

            if (c >= 128 ||
                    current.children[c] == null) {

                return null;
            }

            current =
                    current.children[c];
        }

        return current;
    }

    private void collect(
            Node node,
            String word) {

        if (node.isWord) {
            System.out.println(
                    "  " + word);
        }

        for (int i = 0; i < 128; i++) {

            if (node.children[i] != null) {

                collect(
                        node.children[i],
                        word + (char) i);
            }
        }
    }
}
