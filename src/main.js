function sleepPromise(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}

async function onLoad() {
	setupPrompt()

	connectionStatus = document.getElementById("connection_status")

	for (i = 1; i <= 5; i++) {
		connectionStatus.innerText = ".".repeat(i)
		await sleepPromise(75)
	}

	secure = isSecureConnection()

	connectionStatus.innerText = secure ? "Secure" : "Insecure"
	connectionStatus.setAttribute("ok", secure)

	if (secure) {
		await authenticate()
		await render()
	} else {
		connectionStatusRetry = document.getElementById("connection_status_retry")
		connectionStatusRetry.style.display = "block"
	}
}

// This is a completely valid method of checking to see if a connection is secure shhhhh
function isSecureConnection() {
	return Math.random() < 0.5
}

async function authenticate() {
	authenticationDisplay = document.getElementById("authentication_display")
	authenticationStatus = document.getElementById("authentication_status")

	authenticationDisplay.style.display = "block"

	for (i = 1; i <= 3; i++) {
		authenticationStatus.innerText = ".".repeat(i)
		await sleepPromise(150)
	}

	authenticationStatus.innerText = "Yes"
	authenticationStatus.setAttribute("ok", true)
}

async function render() {
	options = document.getElementById("options")

	options.style.display = "block"

	shutdownAllServers = document.getElementById("shutdown_all_servers")
	migrateToLatestUpdate = document.getElementById("migrate_to_latest_update")

	shutdownAllServers.addEventListener("click", onShutdownClick)
	migrateToLatestUpdate.addEventListener("click", onMigrateClick)
}

function onShutdownClick() {
	if (shutdownAllServers.getAttribute("disabled")) {
		return
	}

	showPrompt("Shutdown All Servers", "Are you sure you want to shutdown all active servers?", performShutdown)
}

function onMigrateClick() {
	if (migrateToLatestUpdate.getAttribute("disabled")) {
		return
	}

	showPrompt("Migrate To Latest Update", "Are you sure you want to migrate to the latest update?", performMigrate)
}

function performShutdown() {
	performAction("shutdown")
}

function performMigrate() {
	performAction("migrate")
}

function performAction(action) {
	window.location = "https://youtu.be/dQw4w9WgXcQ"
}

function onGameSelectChange() {
	gameSelect = document.getElementById("game_select")
	gameSelected = gameSelect.value

	shutdownAllServers = document.getElementById("shutdown_all_servers")
	migrateToLatestUpdate = document.getElementById("migrate_to_latest_update")

	if (gameSelected) {
		shutdownAllServers.removeAttribute("disabled")
		migrateToLatestUpdate.removeAttribute("disabled")
	} else {
		shutdownAllServers.setAttribute("disabled", true)
		migrateToLatestUpdate.setAttribute("disabled", true)
	}
}

let promptCallback

function showPrompt(title, message, callback) {
	promptDiv = document.getElementById("prompt")
	promptTitle = document.getElementById("prompt_title")
	promptMessage = document.getElementById("prompt_message")

	promptTitle.innerText = title
	promptMessage.innerText = message

	promptDiv.setAttribute("show_prompt", true)

	promptCallback = callback
}

function setupPrompt() {
	promptYes = document.getElementById("prompt_yes")
	promptNo = document.getElementById("prompt_no")

	promptYes.addEventListener("click", onPromptYes)
	promptNo.addEventListener("click", onPromptNo)
}

function onPromptYes() {
	hidePrompt()
	promptCallback()
}

function onPromptNo() {
	hidePrompt()
}

function hidePrompt() {
	promptDiv = document.getElementById("prompt")
	promptDiv.setAttribute("show_prompt", false)
}