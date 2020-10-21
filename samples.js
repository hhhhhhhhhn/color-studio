let samples = {
	"c": `<pre class="hl"><span class="hl ppc">#include</span> <span class="hl pps">&quot;mmenu.h&quot;</span><span class="hl ppc"></span>
<span class="hl ppc">#include &lt;stdio.h&gt;</span>
<span class="hl ppc">#include &lt;stdlib.h&gt;</span>

<span class="hl ppc">#define MAX_STR_SIZE 128</span>
<span class="hl ppc">#define D_SIZE 128</span>
<span class="hl ppc">#define PATH</span> <span class="hl pps">&quot;/tmp/mmenu&quot;</span><span class="hl ppc"></span>

<span class="hl kwc">typedef</span> <span class="hl kwb">struct</span> darr <span class="hl opt">{</span>
\t<span class="hl kwb">char</span><span class="hl opt">**</span> strs<span class="hl opt">;</span>
\t<span class="hl kwb">int</span> size<span class="hl opt">;</span>
\t<span class="hl kwb">int</span> used<span class="hl opt">;</span>
<span class="hl opt">}</span> darr<span class="hl opt">;</span>

<span class="hl kwb">void</span> <span class="hl kwd">darr_push</span><span class="hl opt">(</span>darr<span class="hl opt">*</span> arr<span class="hl opt">,</span> <span class="hl kwb">char</span><span class="hl opt">*</span> str<span class="hl opt">) {</span>
\t<span class="hl kwa">if</span><span class="hl opt">(</span>arr<span class="hl opt">-&gt;</span>used <span class="hl opt">==</span> arr<span class="hl opt">-&gt;</span>size<span class="hl opt">) {</span>
\t\tarr<span class="hl opt">-&gt;</span>size <span class="hl opt">*=</span> <span class="hl num">2</span><span class="hl opt">;</span>
\t\tarr<span class="hl opt">-&gt;</span>strs <span class="hl opt">=</span> <span class="hl kwd">realloc</span><span class="hl opt">(</span>arr<span class="hl opt">-&gt;</span>strs<span class="hl opt">,</span> arr<span class="hl opt">-&gt;</span>size <span class="hl opt">*</span> <span class="hl kwa">sizeof</span><span class="hl opt">(</span><span class="hl kwb">char</span><span class="hl opt">*));</span>
\t\t<span class="hl kwa">if</span><span class="hl opt">(</span>arr<span class="hl opt">-&gt;</span>strs <span class="hl opt">==</span> NULL<span class="hl opt">)</span> <span class="hl kwd">exit</span><span class="hl opt">(</span><span class="hl num">1</span><span class="hl opt">);</span>
\t<span class="hl opt">}</span>
\tarr<span class="hl opt">-&gt;</span>strs<span class="hl opt">[</span>arr<span class="hl opt">-&gt;</span>used<span class="hl opt">] =</span> str<span class="hl opt">;</span>
\tarr<span class="hl opt">-&gt;</span>used<span class="hl opt">++;</span>
<span class="hl opt">}</span>

<span class="hl kwb">void</span> <span class="hl kwd">darr_free</span><span class="hl opt">(</span>darr<span class="hl opt">*</span> arr<span class="hl opt">) {</span>
\t<span class="hl kwa">for</span><span class="hl opt">(</span><span class="hl kwb">int</span> i <span class="hl opt">=</span> <span class="hl num">0</span><span class="hl opt">;</span> i <span class="hl opt">&lt;</span> arr<span class="hl opt">-&gt;</span>used<span class="hl opt">;</span> i<span class="hl opt">++) {</span>
\t\t<span class="hl kwd">free</span><span class="hl opt">(</span>arr<span class="hl opt">-&gt;</span>strs<span class="hl opt">[</span>i<span class="hl opt">]);</span>
\t<span class="hl opt">}</span>
\t<span class="hl kwd">free</span><span class="hl opt">(</span>arr<span class="hl opt">-&gt;</span>strs<span class="hl opt">);</span>
\t<span class="hl kwd">free</span><span class="hl opt">(</span>arr<span class="hl opt">);</span>
<span class="hl opt">}</span>

darr<span class="hl opt">*</span> <span class="hl kwd">get_options</span><span class="hl opt">(</span><span class="hl kwb">FILE</span><span class="hl opt">*</span> file_ptr<span class="hl opt">) {</span>
\tdarr<span class="hl opt">*</span> options <span class="hl opt">=</span> <span class="hl kwd">malloc</span><span class="hl opt">(</span><span class="hl kwa">sizeof</span><span class="hl opt">(</span>darr<span class="hl opt">));</span>
\t<span class="hl kwa">if</span><span class="hl opt">(</span>options <span class="hl opt">==</span> NULL<span class="hl opt">)</span> <span class="hl kwd">exit</span><span class="hl opt">(</span><span class="hl num">1</span><span class="hl opt">);</span>
\toptions<span class="hl opt">-&gt;</span>strs <span class="hl opt">=</span> <span class="hl kwd">malloc</span><span class="hl opt">(</span>D_SIZE <span class="hl opt">*</span> <span class="hl kwa">sizeof</span><span class="hl opt">(</span><span class="hl kwb">char</span><span class="hl opt">*));</span>
\t<span class="hl kwa">if</span><span class="hl opt">(</span>options<span class="hl opt">-&gt;</span>strs <span class="hl opt">==</span> NULL<span class="hl opt">)</span> <span class="hl kwd">exit</span><span class="hl opt">(</span><span class="hl num">1</span><span class="hl opt">);</span>
\toptions<span class="hl opt">-&gt;</span>size <span class="hl opt">=</span> D_SIZE<span class="hl opt">;</span>
\toptions<span class="hl opt">-&gt;</span>used <span class="hl opt">=</span> <span class="hl num">0</span><span class="hl opt">;</span>

\t<span class="hl kwb">char</span> chr<span class="hl opt">;</span>
\t<span class="hl kwb">char</span><span class="hl opt">*</span> str<span class="hl opt">;</span>
\t<span class="hl kwb">int</span> i<span class="hl opt">;</span>
\t<span class="hl kwa">do</span> <span class="hl opt">{</span>
\t\tstr <span class="hl opt">=</span> <span class="hl kwd">malloc</span><span class="hl opt">(</span>MAX_STR_SIZE <span class="hl opt">*</span> <span class="hl kwa">sizeof</span><span class="hl opt">(</span><span class="hl kwb">char</span><span class="hl opt">));</span>
\t\t<span class="hl kwa">if</span><span class="hl opt">(</span>str <span class="hl opt">==</span> NULL<span class="hl opt">)</span> <span class="hl kwd">exit</span><span class="hl opt">(</span><span class="hl num">1</span><span class="hl opt">);</span>
\t\t<span class="hl kwa">for</span><span class="hl opt">(</span>i <span class="hl opt">=</span> <span class="hl num">0</span><span class="hl opt">;</span> i <span class="hl opt">&lt;</span> MAX_STR_SIZE<span class="hl opt">;</span> i<span class="hl opt">++) {</span>
\t\t\tchr <span class="hl opt">=</span> <span class="hl kwd">fgetc</span><span class="hl opt">(</span>file_ptr<span class="hl opt">);</span>
\t\t\t<span class="hl kwa">if</span><span class="hl opt">(</span>chr <span class="hl opt">==</span> <span class="hl str">&apos;</span><span class="hl esc">\\n</span><span class="hl str">&apos;</span> <span class="hl opt">||</span> chr <span class="hl opt">==</span> EOF<span class="hl opt">)</span> <span class="hl kwa">break</span><span class="hl opt">;</span>
\t\t\tstr<span class="hl opt">[</span>i<span class="hl opt">] =</span> chr<span class="hl opt">;</span>
\t\t<span class="hl opt">}</span>
\t\t<span class="hl kwd">darr_push</span><span class="hl opt">(</span>options<span class="hl opt">,</span> str<span class="hl opt">);</span>
\t<span class="hl opt">}</span>
\t<span class="hl kwa">while</span><span class="hl opt">(</span>chr <span class="hl opt">!=</span> EOF<span class="hl opt">);</span>

\t<span class="hl kwa">return</span> options<span class="hl opt">;</span>
<span class="hl opt">}</span>

<span class="hl kwb">int</span> <span class="hl kwd">main</span><span class="hl opt">(</span><span class="hl kwb">int</span> argc<span class="hl opt">,</span> <span class="hl kwb">char</span><span class="hl opt">**</span> argv<span class="hl opt">) {</span>
\t<span class="hl kwb">FILE</span><span class="hl opt">*</span> file_ptr <span class="hl opt">=</span> <span class="hl kwd">fopen</span><span class="hl opt">(</span>PATH<span class="hl opt">,</span> <span class="hl str">&quot;r&quot;</span><span class="hl opt">);</span>
\t<span class="hl kwa">if</span><span class="hl opt">(</span>file_ptr <span class="hl opt">==</span> NULL<span class="hl opt">)</span> <span class="hl kwd">exit</span><span class="hl opt">(</span><span class="hl num">1</span><span class="hl opt">);</span>
\tdarr<span class="hl opt">*</span> options <span class="hl opt">=</span> <span class="hl kwd">get_options</span><span class="hl opt">(</span>file_ptr<span class="hl opt">);</span>
\t<span class="hl kwd">fclose</span><span class="hl opt">(</span>file_ptr<span class="hl opt">);</span>
\tfile_ptr <span class="hl opt">=</span> <span class="hl kwd">fopen</span><span class="hl opt">(</span>PATH<span class="hl opt">,</span> <span class="hl str">&quot;w&quot;</span><span class="hl opt">);</span>
\t<span class="hl kwa">if</span><span class="hl opt">(</span>file_ptr <span class="hl opt">==</span> NULL<span class="hl opt">)</span> <span class="hl kwd">exit</span><span class="hl opt">(</span><span class="hl num">1</span><span class="hl opt">);</span>

\t<span class="hl kwb">int</span> chosen<span class="hl opt">;</span>
\t<span class="hl kwa">if</span><span class="hl opt">(</span>argc <span class="hl opt">==</span> <span class="hl num">1</span><span class="hl opt">)</span>
\t\tchosen <span class="hl opt">=</span> <span class="hl kwd">mmenu</span><span class="hl opt">(</span>options<span class="hl opt">-&gt;</span>strs<span class="hl opt">,</span> options<span class="hl opt">-&gt;</span>used<span class="hl opt">,</span> <span class="hl str">&quot;&gt; &quot;</span><span class="hl opt">);</span>
\t<span class="hl kwa">else</span>
\t\tchosen <span class="hl opt">=</span> <span class="hl kwd">mmenu</span><span class="hl opt">(</span>options<span class="hl opt">-&gt;</span>strs<span class="hl opt">,</span> options<span class="hl opt">-&gt;</span>used<span class="hl opt">,</span> argv<span class="hl opt">[</span><span class="hl num">1</span><span class="hl opt">]);</span>

\t<span class="hl kwa">if</span><span class="hl opt">(</span>chosen <span class="hl opt">== -</span><span class="hl num">1</span><span class="hl opt">)</span>
\t\t<span class="hl kwd">fputs</span><span class="hl opt">(</span><span class="hl str">&quot;&quot;</span><span class="hl opt">,</span> file_ptr<span class="hl opt">);</span>
\t<span class="hl kwa">else if</span><span class="hl opt">(</span>argc <span class="hl opt">&gt;</span> <span class="hl num">2</span> <span class="hl opt">&amp;&amp;</span> argv<span class="hl opt">[</span><span class="hl num">2</span><span class="hl opt">][</span><span class="hl num">0</span><span class="hl opt">] ==</span> <span class="hl str">&apos;t&apos;</span><span class="hl opt">)</span>
\t\t<span class="hl kwd">fprintf</span><span class="hl opt">(</span>file_ptr<span class="hl opt">,</span> <span class="hl str">&quot;%i&quot;</span><span class="hl opt">,</span> chosen<span class="hl opt">);</span>
\t<span class="hl kwa">else</span>
\t\t<span class="hl kwd">fputs</span><span class="hl opt">(</span>options<span class="hl opt">-&gt;</span>strs<span class="hl opt">[</span>chosen<span class="hl opt">],</span> file_ptr<span class="hl opt">);</span>

\t<span class="hl kwd">darr_free</span><span class="hl opt">(</span>options<span class="hl opt">);</span>
\t<span class="hl kwd">fclose</span><span class="hl opt">(</span>file_ptr<span class="hl opt">);</span>
<span class="hl opt">}</span>`
}