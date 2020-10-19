let styleRoot = document.documentElement.style

let colors = {
	black: "000000",
	white: "bbbbbb",
	red: "bb0000",
	green: "00bb00",
	blue: "0000bb",
	cyan: "00bbbb",
	magenta: "bb00bb",
	yellow: "bbbb00",
	brightblack: "000000",
	brightwhite: "ffffff",
	brightred: "ff0000",
	brightgreen: "00ff00",
	brightblue: "0000ff",
	brightcyan: "00ffff",
	brightmagenta: "ff00ff",
	brightyellow: "ffff00",
}

for(let element of document.getElementsByTagName("input")) {
	element.value = colors[element.id] // Set default value
	styleRoot.setProperty("--" + element.id, "#" + element.value)
	element.insertAdjacentHTML(
		"afterend",
		`<div style="background-color: var(--${element.id});` +
		`height: 1rem; width: 1rem"></div>`
	)

	element.addEventListener("focusout", () => {
		colors[element.id] = element.value
		styleRoot.setProperty("--" + element.id, "#" + element.value)
	})
}