define (function() {
	
	return {
		de  : {
			valeurFace : 1,
			lancer : function (){
				return this.valeurFace = Math.floor(Math.random() * 6 + 1);										
			}

		},

		de1 : 1,			
		de2 : 1,

		isDouble : function (){
			return this.de1 === this.de2;
		}, 
		lancer : function(){
			this.de1 = this.de.lancer();
			this.de2 = this.de.lancer();				

			return this.de1 + this.de2;
		}	
	}

});
