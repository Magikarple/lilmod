// cSpell:ignore Optimise, webui, medvram

const html = `
<h1>What is Stable Diffusion and Automatic1111's Stable Diffusion WebUI?</h1>
Stable Diffusion is an AI model for generating images given a text prompt. Automatic1111's Stable Diffusion WebUI is a web interface for running Stable Diffusion. It is the easiest way to run Stable Diffusion on your computer, and provides an API that we can use to integrate Stable Diffusion into other applications.

<h1>Steps</h1>
<ol>
	<li>Install Automatic1111's Stable Diffusion WebUI</li>
	<li>Download the relevant models</li>
	<li>Place the models in their corresponding directories</li>
	<li>Configure Automatic1111's Stable Diffusion WebUI</li>
	<li>Running the WebUI</li>
	<li>Confirm successful setup</li>
</ol>

<h2>2. Install Automatic1111's Stable Diffusion WebUI</h2>
<p>Before we start, you need to install the Stable Diffusion WebUI. To do this, follow the detailed instructions for installation on Windows, Linux, and Mac on the <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui#installation-and-running">Stable Diffusion WebUI GitHub page</a>.</p>

<h2>3. Download the relevant models</h2>
<p>You will now need to download the following models:</p>
<ul>
	<li><a href="https://civitai.com/models/43331?modelVersionId=94640">MajicMix v6</a></li>
	<li><a href="https://huggingface.co/XpucT/Loras/blob/main/LowRA_v2.safetensors">LowRA v2</a></li>
</ul>

<p>Note that MajicMix is a photorealistic model heavily biased towards Asian girls; if you have a more diverse arcology, you may prefer a different base model like <a href="https://civitai.com/models/16804">Life Like Diffusion</a>, or you might want to try a different style entirely, like <a href="https://civitai.com/models/2583?modelVersionId=106922">Hassaku</a> for an anime style. Your results may vary with other models, since generated prompts are tuned primarily for these models, but don't be afraid to experiment.</p>

<h2>4. Place the models in their corresponding directories</h2>
<p>Next, you need to place the models in the appropriate directories in the Stable Diffusion WebUI:</p>
<ul>
	<li>Place MajicMix v6 in <code>stable-diffusion-webui/models/Stable-diffusion</code></li>
	<li>Place LowRA v2 in <code>stable-diffusion-webui/models/Lora</code></li>
</ul>

<h2>5. Configure Automatic1111's Stable Diffusion WebUI</h2>
<p>To prepare the WebUI for running, you need to modify the <code>COMMANDLINE_ARGS</code> line in either <code>webui-user.sh</code> (if you're using Linux/Mac) or <code>webui-user.bat</code> (if you're using Windows) to include the following:</p>
<p>Linux/Mac:</p>
<pre><code>export COMMANDLINE_ARGS="--medvram --no-half-vae --listen --port=7860 --api --cors-allow-origins *"</code></pre>
<p>Windows:</p>
<pre><code>set COMMANDLINE_ARGS=--medvram --no-half-vae --listen --port=7860 --api --cors-allow-origins *</code></pre>

<p>You may need to use <code>--cors-allow-origins null</code> instead of <code>--cors-allow-origins *</code> if you are using a Chromium-based host (Chrome, Edge, FCHost, or similar), <i>and</i> are running Free Cities from a local HTML file rather than a webserver.</p>

<h2>6. Running the WebUI</h2>
<p>Now you can run the WebUI by executing either <code>webui.sh</code> (Linux/Mac) or <code>webui-user.bat</code> (Windows). Note that the WebUI server needs to be running the whole time you're using it.

Once it's running, open your browser and go to <code>localhost:7860</code>. The WebUI should open. In the top left is a dropdown for model selection, pick MajicMix (or a different model of your choice) in that dropdown.</p>

<h2>7. Check it works</h2>
<p>At this point, if you go to a slave's detail page their image should load after a short (<30 seconds) delay. If it doesn't seem to be working, have a look at the terminal window running Automatic1111's Stable Diffusion WebUI to see if there are any errors.</p>
<p>The request will time out if the image can't be generated fast enough; if this is the case for you, try to find a guide to optimizing Stable Diffusion for your particular hardware setup, or disable the "Upscaling/highres fix" option.</p>

<h2>(Optional) 8. Optimise Your Install</h2>

<h3>ADetailer</h3>
<p><a href="https://github.com/Bing-su/adetailer">ADetailer</a> is a performant way to refine your images (taking less than 10ms on some systems)</p>
<p>Follow the instructions on the GitHub page to install. Remember to restart Stable Diffusion!</p>

<h3>ControlNet and OpenPose</h3>
<p><a href="https://github.com/Mikubill/sd-webui-controlnet">ControlNet</a> allows for precise control of image layout. Free Cities can use the OpenPose module to enforce poses on your slave images, which is much more reliable than prompting for the pose.</p>
<p>Follow the instructions on the GitHub page to install. You only need to set up an OpenPose model (you can ignore all the other models). Remember to restart Stable Diffusion!</p>
<p>Custom OpenPose poses (png or json) can be downloaded and placed in <code>resources/OpenPose</code> in your Free Cities install location, and specified from the Customize tab of Slave Interact.</p>

<h3>Webp Images</h3>
<p>WEBP images (~30 kB) take up much less space compared to JPEG (60-200 kB) or PNG (1-2.5 MB). This is one way you can make images quicker to display, and have less saved on your hard disk as well.</p>
<ol>
  <li>In the Automatic1111 WebUI, in the top toolbar and click "Settings"</li>
  <li>Then, click on the top option of the sidebar (Saving images/grids). You might be there by default.</li>
  <li>In the first text field, "File format for images", enter "webp" without quotes.</li>
  <li>Click the "Apply settings" button at the top, then the "Reload UI" button.</li>
</ol>
`;

const loraHTML = `
<h1>Why is a LoRA pack helpful?</h1>
Slaves in the Free Cities can sometimes have unusual features that Stable Diffusion base models are not trained to handle. LoRAs are small models specifically designed to handle these situations. NGBot has assembled a pack of LoRAs specifically for Free Cities and, if you install the LoRAs and enable prompting for the pack, you can see these features in your AI renders.

<h1>Do I really need all these LoRAs?</h1>
Each of the LoRAs serves a specific purpose; you may install any or all of them at your preference. Without the LoRA for a particular feature, slaves with that feature might not render well. The prompting toggle will generate prompting for all of them, but Stable Diffusion will just skip LoRAs you don't have, so it's safe to turn on if you want to use ANY of the LoRAs in the pack.

Note that many of these LoRAs tend to work better on less realistic base models. If you have many slaves with exotic features, it may be worth switching to an anime-style or pseudorealistic model, rather than a realistic one.

<h1>How do I get NGBot's LoRA pack?</h1>
You'll need to download any or all of the relevant LoRAs:
<ul>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/amputee-000003.safetensors">Amputation Lora</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/hololive_roboco-san-10.safetensors">Android Arms and Legs Lora</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/BEReaction.safetensors">Very large assets Lora</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/eye-allsclera.safetensors">Blind Eyes Lora</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/Empty%20Eyes%20-%20Drooling%20v5%20-%2032dim.safetensors">Mindbroken Lora</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/flaccidfutanarimix-locon-dim64-alpha64-highLR-000003.safetensors">Massive Futa Asset</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/futanari-000009.safetensors">Average Futa Asset</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/micropp_32dim_nai_v2.safetensors">Micro Futa Asset</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/nopussy_v1.safetensors">Null gender slaves</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/xxmaskedxx_lora_v01.safetensors">Fuckdoll Hood</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/Standing%20Straight%20%20v1%20-%20locon%2032dim.safetensors">Fuckdoll Posture</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/OnlyCocksV1LORA.safetensors">Improved Average Male Assets</a></li>
	<li><a href="https://huggingface.co/NGBot/ampuLora/blob/main/CatgirlLoraV7.safetensors">Catperson Lora</a></li>
	<li><a href="https://civitai.com/api/download/models/131998?type=Model&format=SafeTensor">High Profile Implants</a></li>
</ul>

Copy any that you've chosen to use into your <code>stable-diffusion-webui/models/Lora</code> folder (see the Stable Diffusion Installation instructions for details).
`;

/**
 * Generates a link which shows a Stable Diffusion installation guide.
 * @param {string} [text] link text to use
 * @returns {HTMLElement} link
 */
App.UI.stableDiffusionInstallationGuide = function(text) {
	return App.UI.DOM.link(text ? text : "Stable Diffusion Installation Guide", () => {
		Dialog.setup("Stable Diffusion Installation Guide");
		const content = document.createElement("div").innerHTML = html;
		Dialog.append(content);
		Dialog.open();
	});
};

/**
 * Generates a link which the LoRA pack installation guide.
 * @param {string} [text] link text to use
 * @returns {HTMLElement} link
 */
App.UI.loraInstallationGuide = function(text) {
	return App.UI.DOM.link(text ? text : "LoRA Pack Installation Guide", () => {
		Dialog.setup("Stable Diffusion LoRA Pack Installation Guide");
		const content = document.createElement("div").innerHTML = loraHTML;
		Dialog.append(content);
		Dialog.open();
	});
};
