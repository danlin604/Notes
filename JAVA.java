=============================================================


package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class main {
	public static void main(String[] args) throws FileNotFoundException {
        String line;
        String words[] = null;
        String filename = "Dict.txt";
        File file = new File(filename);
        
        if(file.exists()) {
        	System.out.println("File " + filename + " exists.");
        }
        
        Scanner scan = new Scanner(file);
        while(scan.hasNext())
        {
            line = scan.nextLine();
            words = line.split(" "); 
        }
        //number of words
        System.out.println("Number of words: " + words.length);
        
        //Timer
        long startTime1 = System.nanoTime();
        System.out.println("TECHNIQUE 1 running...");
//TECHNIQUE 1
    	int max1 = 0;
    	int maxword1 = 0; //might need something other than 0
    	int count1 = 0;
        //find word with max anagram
        for(int i = 0; i < words.length - 1; i++) {
        	if(count1 > max1) {
        		max1 = count1;
        		maxword1 = i - 1;
        	}
        	count1 = 0;
        	for (int j = i+1; j < words.length; j++) {
        		if(words[i].length() == words[j].length()) {//if w1 and w2 same length
        			if(technique1(words[i],words[j])) {
        				count1++;
        			}
        		}       		
        	}
        }
        float estimatedTime1 = (float)(System.nanoTime() - startTime1)/1000000000;
        System.out.println("Technique #1: " + words[maxword1] + " has " + max1 + " anagrams " + estimatedTime1 + " secs");

        long startTime2 = System.nanoTime();
        System.out.println("TECHNIQUE 2 running...");
//TECHNIQUE 2        
    	int max2 = 0;
    	int maxword2 = 0; //might need something other than 0
    	int count2 = 0;
        //find word with max anagram
        for(int i = 0; i < words.length - 1; i++) {
        	if(count2 > max2) {
        		max2 = count2;
        		maxword2 = i - 1;
        	}
        	count2 = 0;
        	for (int j = i+1; j < words.length; j++) {
        		if(words[i].length() == words[j].length()) {//if w1 and w2 same length
        			if(technique2(words[i],words[j])) {
        				count2++;
        			}
        		}       		
        	}
        }
        float estimatedTime2 = (float)(System.nanoTime() - startTime2)/1000000000;
        System.out.println("Technique #2: " + words[maxword2] + " has " + max2 + " anagrams " + estimatedTime2 + " secs");
        
        long startTime3 = System.nanoTime();
        System.out.println("TECHNIQUE 3 running...");
//TECHNQIUE 3
    	int max3 = 0;
    	int maxword3 = 0; //might need something other than 0
    	int count3 = 0;
        //find word with max anagram
        for(int i = 0; i < words.length - 1; i++) {
        	if(count3 > max3) {
        		max3 = count3;
        		maxword3 = i - 1;
        	}
        	count3 = 0;
        	for (int j = i+1; j < words.length; j++) {
        		if(words[i].length() == words[j].length()) {//if w1 and w2 same length
        			if(technique3(words[i],words[j])) {
        				count3++;
        			}
        		}       		
        	}
        }     
        float estimatedTime3 = (float)(System.nanoTime() - startTime3)/1000000000;
        System.out.println("Technique #3: " + words[maxword3] + " has " + max3 + " anagrams " + estimatedTime3 + " secs");
	}//main end
	

	static boolean technique1(String word1, String word2) {
		StringBuilder sb = new StringBuilder(word2);
		for (int i = 0; i < word1.length(); i++) {
	        for (int j = 0; j < sb.length(); j++) {
	        	if(Character.toLowerCase(word1.charAt(i)) == Character.toLowerCase(sb.charAt(j))) {
	        		sb.deleteCharAt(j);
	        		break;
	        	}		
	        }
	    }
		if(sb.length() == 0) {
			return true;
		} else {
			return false;
		}
	}
	
	static boolean technique2(String word1, String word2) {
		char[] ca1 = word1.toCharArray();
		Arrays.sort(ca1);
		char[] ca2 = word2.toCharArray();
		Arrays.sort(ca2);
		for (int i = 0; i < word1.length(); i++) {
			if(ca1[i] != ca2[i]) {
				return false;
			}
	    }
		return true;		
	}	
	
	static boolean technique3(String word1, String word2) {
		int[]vector = new int[126];
		for(int i = 0; i < word1.length(); i++) {
			vector[(int)(Character.toLowerCase(word1.charAt(i)))]++;		
		}
		for(int i = 0; i < word2.length(); i++) {
			vector[(int)(Character.toLowerCase(word2.charAt(i)))]--;		
		}
		for(int i = 0; i < vector.length; i++) {
			if(vector[i] != 0) {
				return false;
			}
		}
		return true;
	}
}

=============================================================


ArrayList<String> banklist = new ArrayList<String>();
        ArrayList<String> testlist = new ArrayList<String>();
        int count = 0;

        Scanner listScan = new Scanner(new File("lab4_wordlist.txt"));
        Scanner testScan = new Scanner(new File("lab4_testdata.txt"));
        
        while(listScan.hasNext())
        {
            banklist.add(listScan.next());
        }
        
        while(testScan.hasNext())
        {
            testlist.add(testScan.next());
        }


=============================================================

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class SpellChecker {

    public static void main(String[] args) throws FileNotFoundException {
    
        ArrayList<String> banklist = new ArrayList<String>();
        ArrayList<String> testlist = new ArrayList<String>();
        int count = 0;

        Scanner listScan = new Scanner(new File("lab4_wordlist.txt"));
        Scanner testScan = new Scanner(new File("lab4_testdata.txt"));
        
        while(listScan.hasNext())
        {
            banklist.add(listScan.next());
        }
        
        while(testScan.hasNext())
        {
            testlist.add(testScan.next());
        }
        System.out.println(testlist.size());
        System.out.println(banklist.size());

        int num_not_found = 0;

        // Timer
        long startTime1 = System.nanoTime();
        float estimatedTime1;
        // test
        num_not_found = seqSearch(testlist, banklist);
        
        estimatedTime1 = (float) (System.nanoTime() - startTime1) / 1000;
        System.out.println("seqSearch: " + num_not_found + " " + estimatedTime1 + " Microsecond");
        
        // Timer
        long startTime2 = System.nanoTime();
        float estimatedTime2 = 0;
        int num_not_found2 = 0;
        for(int i = 0; i < testlist.size(); i++ ){
            num_not_found2 += binSearch(testlist.get(i), banklist);
        }
        estimatedTime2 = (float) (System.nanoTime() - startTime2) / 1000;
        System.out.println("binSearch: " + num_not_found2 + " " + estimatedTime2 + " Microsecond");
        
    }

    static int seqSearch(ArrayList<String> w1, ArrayList<String> w2) {
        int notfound = 0;
        boolean match = false;
        for (int i = 0; i < w1.size(); i++) {
            match = false;
            for (int j = 0; j < w2.size(); j++) {
                if (w1.get(i).equalsIgnoreCase(w2.get(j))) {
                    match = true;
                    //break;
                }                   
            }
            if(!match) {
                notfound++; 
            }
        }
        return notfound;
    }

    static int binSearch(String s, ArrayList<String> w2) {
        int start = 0;
        int end = w2.size()-1;
        int mid;
        while (start <= end) {
            mid = (start+end)/2;
            if(s.compareToIgnoreCase(w2.get(mid)) > 0 ){
                start = mid + 1;                
            } else if (s.compareToIgnoreCase(w2.get(mid)) < 0 ) {
                end = mid - 1; 
            } else {
                return 0;
            }
        }
        return 1;
    }
}


=============================================================
//lab05

package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class main {
	public static void main(String[] args) throws FileNotFoundException {
		
		
		//ArrayList<String> banklist = new ArrayList<String>();
		ArrayList<Integer> a = new ArrayList<Integer>();
		a.add(2);
		a.add(5);
		a.add(8);
		a.add(3);
		a.add(6);
		a.add(12);
		a.add(9);
		a.add(1);
		a.add(6);
		a.add(5);
		a.add(11);
		
		//find largest
		System.out.println("Array to find largest: 2 5 8 3 6 12 9 1 6 5 11");
		System.out.println("find largest pos: " + find_largest(a,0,a.size()));
		
		//merge sort
		int[] array = {9,8,7,6,5,4,3,2,2,3,1};
		System.out.print("pre-mergeSort result:");
		for(int i = 0; i < array.length; i++) {
			System.out.print(array[i]+ " ");
		}
		System.out.println("");
		mergeSort(array);
		System.out.print("mergeSort result:");
		for(int i = 0; i < array.length; i++) {
			System.out.print(array[i]+ " ");
		}
	}
	
	static int find_largest(ArrayList<Integer> a, int l, int r) {
		if(l == r-1) {
			return l;
		}		
		int midpoint = (int) ((l+r)/2);
		
		int llargest = find_largest(a,l,midpoint);
		int rlargest = find_largest(a,midpoint,r);	
		if (a.get(llargest) > a.get(rlargest))
			return llargest;
		else 
			return rlargest;
	}
	
	static void mergeSort(int[] a) {
		int[] la;
		int[] ra;
		int mid = a.length/2;
		if (a.length > 1) {
			la = Arrays.copyOfRange(a, 0, mid);
			ra = Arrays.copyOfRange(a, mid, a.length);
			mergeSort(la);
			mergeSort(ra);
			merge(la, ra, a);
		}
	}

	private static void merge(int[] la, int[] ra, int[] a) {
		int i = 0, j = 0, k = 0;
		while (i < la.length && j < ra.length) {
			if (la[i] <= ra[j]) {
				a[k] = la[i];
				i++;
			} else {
				a[k] = ra[j];
				j++;
			}
			k++;
		}
		if(j<ra.length) {
			for(int count= j; count<ra.length; count++)
			{
				a[k]= ra[count];
				k++;
			}
		} else {
			for(int count= i; count<la.length; count++)
			{
				a[k]= la[count];
				k++;
			}
		}
	}
}

=============================================================
//1a
FindClosest (A[0…n])

sort the array A
closest = n
for i = 0 to i = n - 1 do
	if A[i+1] - A[i] < n then 
		closest = A[i+1] - A[i]
return closest

//1b
FindClosest (A[0…n])

closest = n
for i = 0 to n do
	for j = 0 to n do
		if A[i] != A[j] then
			if |A[i] - A[j]| < closest then
				closest = |A[i] - A[j]| 

return closest

=============================================================

package test;

import java.util.Comparator;
import java.util.PriorityQueue;

public class main {
    public static void main(String[] args) {
        int[] a = {4, 5, 1, 6, 2, 7, 3, 8};

        //slower nlogn
        FindKSmallest1(a, 4);
        
        //faster logk
        FindKSmallest2(a, 4);

    }
    
    static void FindKSmallest1(int[] a, int k) {
    	MaxComparator pqMaxComparetor1 = new MaxComparator();
        PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, pqMaxComparetor1);
        for (int x : a) {
            pq.offer(x);
        }
        System.out.println("pq1 constructed: " + pq);
        int size = a.length; 
        while(size != k) {
        	pq.poll();
        	size--;
        }
        System.out.println("pq1 result: " + pq);
    }
    
    static void FindKSmallest2(int[] a, int k) {
    	MaxComparator pqMaxComparetor2 = new MaxComparator();
        PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, pqMaxComparetor2);
        
        for (int i = 0; i < a.length; i++) {
        	if (pq.size() < k) {
        		pq.add(a[i]);
        	}
        	else {
        		if (pq.peek() > a[i]) {
        			pq.poll();
        			pq.add(a[i]);
        		}
        	}
        }
        
        System.out.print("pq2 result: " + pq);
    }


    static class MaxComparator implements Comparator<Integer> {

        public int compare(Integer one, Integer two) {
            return two - one;
        }
    }
}

=============================================================


package test;

import java.util.Comparator;
import java.util.PriorityQueue;

public class main {
    public static void main(String[] args) {
        int[] a = {4, 5, 1, 6, 2, 7, 3, 8};

        //slower nlogn
        FindKSmallest1(a, 4);
        
        //faster logk
        FindKSmallest2(a, 4);

    }
    
    static void FindKSmallest1(int[] a, int k) {
    	MaxComparator pqMaxComparetor1 = new MaxComparator();
        PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, pqMaxComparetor1);
        for (int x : a) {
            pq.offer(x);
        }
        System.out.println("pq1 constructed: " + pq);
        int size = a.length; 
        while(size != k) {
        	pq.poll();
        	size--;
        }
        System.out.println("pq1 result: " + pq);
    }
    
    static void FindKSmallest2(int[] a, int k) {
    	MaxComparator pqMaxComparetor2 = new MaxComparator();
        PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, pqMaxComparetor2);
        
        for (int i = 0; i < a.length; i++) {
        	if (pq.size() < k) {
        		pq.add(a[i]);
        	}
        	else {
        		if (pq.peek() > a[i]) {
        			pq.poll();
        			pq.add(a[i]);
        		}
        	}
        }
        
        System.out.print("pq2 result: " + pq);
    }


    static class MaxComparator implements Comparator<Integer> {

        public int compare(Integer one, Integer two) {
            return two - one;
        }
    }
}


public static void method1() {
  System.out.println("Opening file....");
  File file = new File("src/love.txt");
  TreeMap<String, Integer> map = new TreeMap<String, Integer>();
  String word;
  int count;
  
  try {
   Scanner scan = new Scanner(file);
   while(scan.hasNext()){
    word = scan.next();
    if(map.containsKey(word)){
     count = map.get(word);
     count++;
     map.put(word, count);
    }
    else{
     map.put(word, 1);
    }
   } 
  }
  catch (FileNotFoundException e) {
   e.printStackTrace();
  }
  System.out.println("The words are:");
  for (Map.Entry<String, Integer> row : map.entrySet()) {
       System.out.println(row.getKey() + " : " + row.getValue());
  }
 }


=============================================================


 package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class main {
    public static void main(String[] args) throws FileNotFoundException {

        // Question 1
        Map<String, Integer> m = new TreeMap<String, Integer>();
        ArrayList<String> a = new ArrayList<String>();
        Scanner scan = new Scanner(new File("love.txt"));
        
        while(scan.hasNext())
        {
            a.add(scan.next());
        }
        
        String word;
        int count;
        for (int i = 0; i < a.size(); i++) {
            word = a.get(i).toLowerCase();
            if(m.containsKey(word)) {
                count = m.get(word);
                count++;
                m.put(word, count);
            } else {
                m.put(word, 1);
            }
        }

        //print map
        for (Map.Entry<String, Integer> entry : m.entrySet())
        {
            System.out.println(entry.getKey() + " - " + entry.getValue());
        }
        
        
        // Question 2
        System.out.println("");
        HashSet<String> hs = new HashSet<String>();
        Scanner scan2 = new Scanner(new File("q2input.txt"));
        boolean distinct = true;
        while(scan2.hasNext())
        {
            if (hs.contains(scan2.next())) {
                distinct = false;
            } else {
                hs.add(scan2.next());
            }           
        }    
        if(distinct) {
            System.out.println("DISTINCT");
        } else {
            System.out.println("NOT DISTINCT");
        }
        
        // Question 3
        System.out.println("");
        HashSet<String> key = new HashSet<String>();
        HashSet<String> excuse = new HashSet<String>();
        Scanner file = new Scanner(new File("q3Test.txt"));
        String line;
        String words[] = null;
        
        int k = 0; // # of keywords
        int e = 0; // # of excuses
        int row = 1;
        
        while(file.hasNext())
        {
            line = file.nextLine();
            words = line.split(" "); 
            if (row == 1) {
                k = Integer.parseInt(words[0]);
                e = Integer.parseInt(words[1]);
            }
            else if (row < k+2) {
                key.add(words[0]);
            }
            else {
                
            }
        }
    }
}

=============================================================

package lab08;

import java.util.LinkedList;
import java.util.Queue;

public class AdjGraph {
    // PART I
    int matrix[][];
    int V;
    boolean directed = false;

    AdjGraph(int V) {
        matrix = new int[V][V];
        this.V = V;
    }

    public void addEdge(int u, int v) {
        if (directed) {
            matrix[u][v] = 1;
        } else {
            matrix[u][v] = 1;
            matrix[v][u] = 1;
        }
        
    }

    public String toString() {
        String s = "";
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                s += matrix[i][j] + " ";
                if (j == V - 1) {
                    s += "\n";
                }
            }
        }
        return s;
    }

    public int degree(int v) {
        if (directed) {
            return inDegree(v) + outDegree(v);
        } else {
            return inDegree(v);
        }
    }

    public boolean isDirected() {
        return directed;
    }

    public int inDegree(int v) {
        int deg = 0;
        for (int i = 0; i < V; i++) {
            if (matrix[i][v] == 1) {
                deg += matrix[i][v];
            }
        }
        return deg;
    }

    public int outDegree(int v) {
        int deg = 0;
        for (int j = 0; j < V; j++) {
            if(matrix[v][j] == 1) {
                deg += matrix[v][j];
            }
        }
        return deg;
    }
    
    // PART II
    boolean cycle = false;
    int[] visited;
    public void DFS(AdjGraph G) {
        visited = new int[V];
        for (int i = 0; i < V; i++) {
            if(visited[i] != 1) {
                dfs(i);
            }
        }
    }
    
    public void dfs(int v) {
        visited[v] = 1;
        System.out.println("visiting vertex " + v);
        for (int j = 0; j < V; j++) {
            if(matrix[v][j] == 1 && visited[j] == 1 && inDegree(j) > 2) {
                cycle = true;
            }
            if(matrix[v][j] == 1 && visited[j] != 1) {
                dfs(j);
            }
        }
    }
    
    public boolean hasCycle(AdjGraph g) {
        return cycle;
    }

    public void BFS(AdjGraph G) {
        visited = new int[V];
        for (int i = 0; i < V; i++) {
            if (visited[i] != 1) {
                bfs(i);
            }
        }
    }

    Queue queue = new LinkedList();
    public void bfs(int v) {
        visited[v] = 1;
        //initialize a queue Q
        queue.add(v);
        System.out.println("visiting vertex " + v);
        while (!queue.isEmpty()){
            for (int i = 0; i < V; i++) {
                if(matrix[(int) queue.peek()][i] == 1 && visited[i] != 1) {
                    visited[i] = 1;
                    queue.add(i);   
                    System.out.println("visiting vertex " + i);
                }
            }
            queue.remove();
        }
    }
}


package lab08;

public class GraphTest {

    public static void main(String[] args) {
        //PART I
        //g1
        System.out.println("\nPART I\n");
        AdjGraph graph = new AdjGraph(5);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(3, 0);
        graph.addEdge(4, 0);
        graph.addEdge(4, 1);
        graph.addEdge(4, 3);
        System.out.println("degree[0]=" + graph.degree(0));
        System.out.println(graph.toString());
        
        //g2
        AdjGraph graph2 = new AdjGraph(4);
        graph2.addEdge(0, 1);
        graph2.addEdge(2, 1);
        graph2.addEdge(3, 2);
        System.out.println("degree[0]=" + graph2.degree(0));
        System.out.println(graph2.toString());
        
        //g3
        AdjGraph graph3 = new AdjGraph(6);
        graph3.addEdge(2, 0);
        graph3.addEdge(3, 1);
        graph3.addEdge(4, 0);
        graph3.addEdge(4, 2);
        graph3.addEdge(5, 1);
        graph3.addEdge(5, 3);
        System.out.println("degree[0]=" + graph3.degree(0));
        System.out.println(graph3.toString());
        
        System.out.println("\nDirected Graph for above.\nMore examples in PART II for hasCycle.\n");
        AdjGraph graph3d = new AdjGraph(6);
        graph3d.directed = true;
        graph3d.addEdge(2, 0);
        graph3d.addEdge(3, 1);
        graph3d.addEdge(4, 0);
        graph3d.addEdge(4, 2);
        graph3d.addEdge(5, 1);
        graph3d.addEdge(5, 3);
        System.out.println("degree[0]=" + graph3d.degree(0));
        System.out.println("inDegree[0]=" + graph3d.inDegree(0));
        System.out.println("outDegree[0]=" + graph3d.outDegree(0));
        System.out.println(graph3d.toString());     
        
        graph.directed = true;      
        boolean d = graph.isDirected();
        if(d)
            System.out.println("directed=" + d);
        
        //PART II
        System.out.println("\nPART II\n");
        System.out.println("\nDFS\n");
        AdjGraph graph4 = new AdjGraph(8);
        graph4.addEdge(0, 1);
        graph4.addEdge(0, 2);
        graph4.addEdge(0, 4);
        graph4.addEdge(1, 0);
        graph4.addEdge(1, 3);
        graph4.addEdge(1, 5);
        graph4.addEdge(2, 0);
        graph4.addEdge(2, 3);
        graph4.addEdge(2, 6);
        graph4.addEdge(3, 1);
        graph4.addEdge(3, 2);
        graph4.addEdge(3, 7);
        graph4.addEdge(4, 0);
        graph4.addEdge(4, 5);
        graph4.addEdge(4, 6);
        graph4.addEdge(5, 1);
        graph4.addEdge(5, 4);
        graph4.addEdge(5, 7);
        graph4.addEdge(6, 2);
        graph4.addEdge(6, 4);
        graph4.addEdge(6, 7);
        graph4.addEdge(7, 3);
        graph4.addEdge(7, 5);
        graph4.addEdge(7, 6);       
        System.out.println(graph4.toString());
        graph4.DFS(graph4);
        System.out.println("hasCycle=" + graph4.cycle);
        
        System.out.println("\nMore hasCycle() examples\n");
        
        
        AdjGraph graph5 = new AdjGraph(5);
        graph5.cycle = false;
        graph5.directed = true;
        graph5.addEdge(0, 1);
        graph5.addEdge(1, 2);
        graph5.addEdge(2, 3);
        System.out.println(graph5.toString());
        graph5.DFS(graph5);
        System.out.println("hasCycle=" + graph5.cycle + "\n");
        
        AdjGraph graph6 = new AdjGraph(10);
        graph6.cycle = false;
        graph6.directed = false;
        graph6.addEdge(0, 1);
        graph6.addEdge(2, 3);
        graph6.addEdge(8, 9);
        System.out.println(graph6.toString());
        graph6.DFS(graph6);
        System.out.println("hasCycle=" + graph6.cycle + "\n");
        
        AdjGraph graph7 = new AdjGraph(4);
        graph7.cycle = false;
        graph7.directed = true;
        graph7.addEdge(0, 1);
        graph7.addEdge(1, 2);
        graph7.addEdge(2, 1);
        graph7.addEdge(3, 1);
        System.out.println(graph7.toString());  
        graph7.DFS(graph7);
        System.out.println("hasCycle=" + graph7.cycle + "\n");
        
        //BFS
        System.out.println("\nBFS\n");
        graph4.BFS(graph4);
        
    }
}

=============================================================


package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Scanner;
import java.util.Set;

public class main {
	public static void main(String[] args) {

		System.out.println("Opening file1....");
		File file1 = new File("lab0801.txt");

		int line_count = 0;
		int num_of_albums = 0;
		int num_of_tests = 0;
		String[] original = null;
		String[] desired = null;
		
		try {
			Scanner scan = new Scanner(file1);
			while (scan.hasNext()) {				
				if(num_of_tests == 0) {
					num_of_tests = Integer.parseInt((scan.nextLine().trim()));
				}
				
				num_of_albums = Integer.parseInt((scan.nextLine().trim()));
				
				original = new String[num_of_albums];
				desired = new String[num_of_albums];
				
				for(int a = 0; a < num_of_albums; a++) {
					original[a] = scan.nextLine().trim();
				}
				
				for(int b = 0; b < num_of_albums; b++) {
					desired[b] = scan.nextLine().trim();
				}
				
				find_steps(original,desired,num_of_albums);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}		
		
		
		
			
		System.out.println("Opening file2....");
		File file2 = new File("lab0802.txt");
		
		boolean star = false;
		HashMap<String, Integer> map = null;
		ArrayList<String> al = null;
		ArrayList<LinkedList<Integer>> tree = null;
		LinkedList<Integer> ll = null;
		int value = 0;
		String line;
		
		try {
			Scanner scan = new Scanner(file2);
			while (scan.hasNext()) {				
				
				if(num_of_tests == 0) {
					num_of_tests = Integer.parseInt((scan.nextLine().trim()));
				}
				
				if(!star) {
					map = new HashMap<String, Integer>();
					al = new ArrayList<String>();
					tree = new ArrayList<LinkedList<Integer>>();
					ll = new LinkedList<Integer>();
				}				
				
				
				while(!star){
					line = scan.nextLine().trim();
					if(line.equals("*")){
						star = true;
					}
					map.put(line, value);
					al.add(line);
					value++;
				}
				
				String start, end;
				if(star) {
					for(int i = 0; i < 2; i++) {
						start = scan.next();
						end = scan.next();
						
						System.out.println(start + ' ' + end);
						
						//construct nodes?						
						tree = constructTree(tree, al);
						
						//run bfs(tree);
					}
				}				
				
				
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}	
		
		
		
		/*
		linkedlist<integer> graph[];
		for(int i = 0; i < 200; i++) {
			G[i] = new linkedlist<integer>();
			
		Hashmap<string,Integer> map = new ... ();
		
		Index = 0;
		
		while(!scan.readln.equal('*'){
			map(word,index);
			arraylist.add(word);
			for(int i = 0; i < index; i++) {
				if(check(word,arraylist[i]) {
					G[i].add(index);
					G[index].add(i);					
				}
				index++;
				
			}
		}
		//apply BFS
		*/
		
		
		System.out.println("\nProgram End");	
	}
	
	static ArrayList<LinkedList<Integer>> constructTree(ArrayList<LinkedList<Integer>> tree, ArrayList<String> list) {
		return tree;
	}
	
	static boolean isNeighbor(String lhs, String rhs) {
		if(lhs.length() == rhs.length()) {
			int mismatch = 0;
			for(int i = 0; i < lhs.length(); i++) {
				if(lhs.charAt(i) != rhs.charAt(i)) {
					mismatch++;
				}
				if(mismatch == 2) {
					return false;
				}
			}
			return true;
		}		
		return false;
	}
	
	static void find_steps(String[] original, String[] desired, int size) {
		int i = size-1;
		int j = size-1;
		
		while(i > -1) {
			if(original[i].equals(desired[j])) {
				i--;
				j--;
			} else {
				i--;
			}
		}
		while(j>-1) {
			System.out.println(desired[j]);
			j--;
		}
		System.out.println();		
	}
	
	/*
	public void BFS(ArrayList<Integer> nodes) {
        int[] visited = new int[nodes.size()];
        for (int i = 0; i < nodes.size(); i++) {
            if (visited[i] != 1) {
                bfs(i);
            }
        }
    }
	
    public void bfs(int v) {
        visited[v] = 1;
        //initialize a queue Q
        queue.add(v);
        System.out.println("visiting vertex " + v);
        while (!queue.isEmpty()){
            for (int i = 0; i < V; i++) {
                if(matrix[(int) queue.peek()][i] == 1 && visited[i] != 1) {
                    visited[i] = 1;
                    queue.add(i);   
                    System.out.println("visiting vertex " + i);
                }
            }
            queue.remove();
        }
    }*/
}


=============================================================


