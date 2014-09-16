//tu file
BoardTest = TestCase("BoardTest");
BoardTest.prototype.setUp = function(){
	console.log("--------------------------------->setup");
}

BoardTest.prototype.testBoardInit = function () {
	console.log("This is log message.");
	Monopoly.init();		

}

BoardTest.prototype.test_Gobelet_lancer_inbounds = function () {
	Monopoly.init();
	for (var i = 0 ; i < 40 ; i++){
		var value = Monopoly.gobelet.lancer();
		assertTrue(value >= 2 && value <= 12);
	}

	assertEquals("plateau length",Monopoly.plateau.length, 40);	

}

BoardTest.prototype.testBoardPlateauSize = function () {

	assertEquals("plateau length",Monopoly.plateau.length, 40);	

}




