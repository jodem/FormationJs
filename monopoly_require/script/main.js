require(["monopoly/monopoly"], function(monop) {
	if (monop) {
		monop.play();
	} else {
		console.log("Erreur d'initialisation");
	}

});