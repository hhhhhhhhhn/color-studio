let samples = {
	"c": `<?xml version="1.0" encoding="UTF-8" ?>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<!-- This file was created with the aha Ansi HTML Adapter. https://github.com/theZiz/aha -->
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="application/xml+xhtml; charset=UTF-8"/>
	<title>stdin</title>
	</head>
	<body>
	<pre>
	<span class="magenta">#include</span> <span class="red">&quot;mmenu.h&quot;</span><span class="magenta"></span>
	<span class="magenta">#include &lt;stdio.h&gt;</span>
	<span class="magenta">#include &lt;stdlib.h&gt;</span>
	
	<span class="magenta">#define MAX_STR_SIZE 128</span>
	<span class="magenta">#define D_SIZE 128</span>
	<span class="magenta">#define PATH</span> <span class="red">&quot;/tmp/mmenu&quot;</span><span class="magenta"></span>
	
	<span class="green">typedef</span> <span class="green">struct</span> darr {
			<span class="green">char</span>** strs;
			<span class="green">int</span> size;
			<span class="green">int</span> used;
	} darr;
	
	<span class="green">void</span> <span class="green">darr_push</span>(darr* arr, <span class="green">char</span>* str) {
			<span class="yellow">if</span>(arr-&gt;used == arr-&gt;size) {
					arr-&gt;size *= <span class="blue">2</span>;
					arr-&gt;strs = <span class="green">realloc</span>(arr-&gt;strs, arr-&gt;size * <span class="yellow">sizeof</span>(<span class="green">char</span>*));
					<span class="yellow">if</span>(arr-&gt;strs == NULL) <span class="green">exit</span>(<span class="blue">1</span>);
			}
			arr-&gt;strs[arr-&gt;used] = str;
			arr-&gt;used++;
	}
	
	<span class="green">void</span> <span class="green">darr_free</span>(darr* arr) {
			<span class="yellow">for</span>(<span class="green">int</span> i = <span class="blue">0</span>; i &lt; arr-&gt;used; i++) {
					<span class="green">free</span>(arr-&gt;strs[i]);
			}
			<span class="green">free</span>(arr-&gt;strs);
			<span class="green">free</span>(arr);
	}
	
	darr* <span class="green">get_options</span>(<span class="green">FILE</span>* file_ptr) {
			darr* options = <span class="green">malloc</span>(<span class="yellow">sizeof</span>(darr));
			<span class="yellow">if</span>(options == NULL) <span class="green">exit</span>(<span class="blue">1</span>);
			options-&gt;strs = <span class="green">malloc</span>(D_SIZE * <span class="yellow">sizeof</span>(<span class="green">char</span>*));
			<span class="yellow">if</span>(options-&gt;strs == NULL) <span class="green">exit</span>(<span class="blue">1</span>);
			options-&gt;size = D_SIZE;
			options-&gt;used = <span class="blue">0</span>;
	
			<span class="green">char</span> chr;
			<span class="green">char</span>* str;
			<span class="green">int</span> i;
			<span class="yellow">do</span> {
					str = <span class="green">malloc</span>(MAX_STR_SIZE * <span class="yellow">sizeof</span>(<span class="green">char</span>));
					<span class="yellow">if</span>(str == NULL) <span class="green">exit</span>(<span class="blue">1</span>);
					<span class="yellow">for</span>(i = <span class="blue">0</span>; i &lt; MAX_STR_SIZE; i++) {
							chr = <span class="green">fgetc</span>(file_ptr);
							<span class="yellow">if</span>(chr == <span class="red">'</span><span class="magenta">\\n</span><span class="red">'</span> || chr == EOF) <span class="yellow">break</span>;
							str[i] = chr;
					}
					<span class="green">darr_push</span>(options, str);
			}
			<span class="yellow">while</span>(chr != EOF);
	
			<span class="yellow">return</span> options;
	}
	
	<span class="green">int</span> <span class="green">main</span>(<span class="green">int</span> argc, <span class="green">char</span>** argv) {
			<span class="green">FILE</span>* file_ptr = <span class="green">fopen</span>(PATH, <span class="red">&quot;r&quot;</span>);
			<span class="yellow">if</span>(file_ptr == NULL) <span class="green">exit</span>(<span class="blue">1</span>);
			darr* options = <span class="green">get_options</span>(file_ptr);
			<span class="green">fclose</span>(file_ptr);
			file_ptr = <span class="green">fopen</span>(PATH, <span class="red">&quot;w&quot;</span>);
			<span class="yellow">if</span>(file_ptr == NULL) <span class="green">exit</span>(<span class="blue">1</span>);
	
			<span class="green">int</span> chosen;
			<span class="yellow">if</span>(argc == <span class="blue">1</span>)
					chosen = <span class="green">mmenu</span>(options-&gt;strs, options-&gt;used, <span class="red">&quot;&gt; &quot;</span>);
			<span class="yellow">else</span>
					chosen = <span class="green">mmenu</span>(options-&gt;strs, options-&gt;used, argv[<span class="blue">1</span>]);
	
			<span class="yellow">if</span>(chosen == -<span class="blue">1</span>)
					<span class="green">fputs</span>(<span class="red">&quot;&quot;</span>, file_ptr);
			<span class="yellow">else if</span>(argc &gt; <span class="blue">2</span> &amp;&amp; argv[<span class="blue">2</span>][<span class="blue">0</span>] == <span class="red">'t'</span>)
					<span class="green">fprintf</span>(file_ptr, <span class="red">&quot;%i&quot;</span>, chosen);
			<span class="yellow">else</span>
					<span class="green">fputs</span>(options-&gt;strs[chosen], file_ptr);
	
			<span class="green">darr_free</span>(options);
			<span class="green">fclose</span>(file_ptr);
	}
	</pre>
	</body>
	</html>`
}