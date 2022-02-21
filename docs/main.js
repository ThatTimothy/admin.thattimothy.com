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

	grantAdmin = document.getElementById("grant_admin")
	shutdownAllServers = document.getElementById("shutdown_all_servers")
	migrateToLatestUpdate = document.getElementById("migrate_to_latest_update")

	grantAdmin.addEventListener("click", onGrantAdminClick)
	shutdownAllServers.addEventListener("click", onShutdownClick)
	migrateToLatestUpdate.addEventListener("click", onMigrateClick)
}

function onGrantAdminClick() {
	grantAdmin = document.getElementById("grant_admin")
	if (grantAdmin.getAttribute("disabled")) {
		return
	}

	let username = prompt("Enter username to grant admin to:")

	if (username.length <= 3 || username.length > 20) {
		alert("Invalid username")
		return onGrantAdminClick()
	}

	showPrompt("Grant Admin", `Are you sure you want to grant admin to '${username}'?`, performGrantAdmin)
}

function onShutdownClick() {
	shutdownAllServers = document.getElementById("shutdown_all_servers")
	if (shutdownAllServers.getAttribute("disabled")) {
		return
	}

	showPrompt("Shutdown All Servers", "Are you sure you want to shutdown all active servers?", performShutdown)
}

function onMigrateClick() {
	migrateToLatestUpdate = document.getElementById("migrate_to_latest_update")
	if (migrateToLatestUpdate.getAttribute("disabled")) {
		return
	}

	showPrompt("Migrate To Latest Update", "Are you sure you want to migrate to the latest update?", performMigrate)
}

function performGrantAdmin() {
	performAction("grant_admin")
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

	options = document.getElementById("options")
	migrateToLatestUpdate = document.getElementById("migrate_to_latest_update")

	for (option of options.children) {
		if (gameSelected) {
			option.removeAttribute("disabled")
		} else {
			option.setAttribute("disabled", true)
		}
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