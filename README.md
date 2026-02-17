1) What is the difference between null and undefined?

undefined মানে হলো একটি variable declare করা হয়েছে কিন্তু কোনো value দেওয়া হয়নি। JavaScript নিজে থেকে এই value বসিয়ে দেয়।
null মানে হলো ইচ্ছাকৃতভাবে "কোনো value নেই" বোঝানো। এটি programmer নিজে assign করে।
সহজ উদাহরণ — কেউ যদি একটি বাক্স বানায় কিন্তু কিছু না রাখে, সেটা undefined। আর বাক্সে ইচ্ছা করে "খালি" লিখে রাখলে সেটা null।
typeof দিয়ে দেখলে undefined এর type হয় "undefined", আর null এর type হয় "object" — এটা JavaScript এর একটি পুরনো bug।
দুটো == দিয়ে তুলনা করলে true আসে, কিন্তু === দিয়ে করলে false আসে কারণ তাদের type আলাদা।

2) What is the use of the map() function in JavaScript? How is it different from forEach()?

দুটোই array এর প্রতিটি element এর উপর কাজ করে, কিন্তু মূল পার্থক্য হলো return value তে।
map() কাজ শেষে একটি নতুন array তৈরি করে return করে। মূল array অপরিবর্তিত থাকে।
forEach() শুধু কাজটি করে, কিছুই return করে না — মানে undefined পাওয়া যায়।
কখন কোনটা ব্যবহার করবে — যদি নতুন array দরকার হয় তাহলে map() ব্যবহার করো। যদি শুধু কিছু print করতে হয় বা side-effect দরকার তাহলে forEach() ব্যবহার করো। map() এর সাথে filter() বা reduce() chain করা যায়, forEach() এর সাথে যায় না।

3) What is the difference between == and ===?
== হলো Loose Equality। এটি শুধু value তুলনা করে। দুটো জিনিসের type আলাদা হলে সে নিজে থেকে type convert করে তারপর তুলনা করে। যেমন 5 আর "5" তুলনা করলে সে "5" কে number এ বদলে নেয় এবং true দেয়।
=== হলো Strict Equality। এটি value এবং type দুটোই দেখে। কোনো conversion করে না। তাই 5 আর "5" তুলনা করলে false দেয় কারণ একটি number আরেকটি string।
সবসময় === ব্যবহার করা best practice কারণ == অনেক সময় unexpected result দেয় যা bug তৈরি করে।

4) What is the significance of async/await in fetching API data?
API থেকে data আনতে সময় লাগে। JavaScript স্বভাবতই non-blocking, মানে সে অপেক্ষা না করে পরের কাজে চলে যায়। এতে সমস্যা হয় যখন আমাদের data আসার পরেই পরবর্তী কাজ করতে হবে।
async/await ব্যবহার করলে আমরা বলতে পারি "এখানে একটু অপেক্ষা করো, data আসলে তারপর এগিয়ে যাও।" এতে code দেখতে সহজ এবং পড়তে স্বাভাবিক মনে হয়, অনেকটা synchronous code এর মতো।
আগে Promise chain এর মাধ্যমে .then() এবং .catch() দিয়ে কাজ করতে হতো, যা অনেক nested হয়ে যেত এবং পড়া কঠিন হতো। async/await এই সমস্যা দূর করে। এছাড়া try/catch ব্যবহার করে error handle করা যায়, যা অনেক পরিষ্কার পদ্ধতি।

5) Explain the concept of Scope in JavaScript (Global, Function, Block).
Scope মানে হলো একটি variable কোথায় কোথায় access করা যাবে তার সীমানা।
Global Scope — যে variable সবার বাইরে declare করা হয়, সেটি পুরো program এর যেকোনো জায়গা থেকে access করা যায়। যেকোনো function বা block এর ভেতর থেকেও দেখা যায়।
Function Scope — কোনো function এর ভেতরে declare করা variable শুধুমাত্র সেই function এর ভেতরেই ব্যবহার করা যায়। function এর বাইরে থেকে সেই variable access করতে গেলে error আসে।
Block Scope — curly braces দিয়ে তৈরি যেকোনো block যেমন if, for, while এর ভেতরে let বা const দিয়ে declare করা variable শুধু সেই block এর মধ্যে থাকে। block শেষ হলে সেই variable আর পাওয়া যায় না।

