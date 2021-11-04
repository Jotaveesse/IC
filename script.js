var gameEnded=true;
var score=0;
var highScore=0;
var highScoreDisplay;
var startButton;

window.onload=function(){
	highScoreDisplay=document.getElementById("hi_score");
	startButton=document.getElementById("start_button");
	
	//quando o usuario clica no icone do email
	document.getElementById("gmail_icon").addEventListener("click",
	function(){
		navigator.clipboard.writeText("jvs2@cin.ufpe.br");
		displayPopup("Email copiado");
	});
	
	//quando o usuario clica no icone do discord
	document.getElementById("discord_icon").addEventListener("click",
	function(){
		navigator.clipboard.writeText("JVS#7655");
		displayPopup("Usuário do discord copiado");
	});
	
	//quando o usuario clica no icone do telefone
	document.getElementById("phone_icon").addEventListener("click",
	function(){
		navigator.clipboard.writeText("+5581988600759");
		displayPopup("Número de celular copiado");
	});
	
	//quando o usuario clica no botao de começar o joguinho
	document.getElementById("start_button").addEventListener("click",
	function(e){
		document.getElementsByClassName("game")[0].style.display="flex";
		//so começa um jogo se o anterior tiver acabado
		if(gameEnded)
		{
			score=0;
			gameEnded=false;
			startButton.innerHTML=score;
			loopSpawn();
		}
		
	});
	//quando clica em um inimigo
	document.addEventListener('click',function(e){
    if(e.target && e.target.className== "enemy"){
		e.target.remove();
		score++;
		document.getElementById("start_button").innerHTML=score;
	}
	});
};

function loopSpawn(){
	//o delay entre inimigos diminui conforme o score aumenta
	var spawnDelay=(1/(1.025**score))*1000+100;
	
	var timeOut=setTimeout(function(){
		//spawna os inimigos com um delay aleatorio pra ficar mais legal
		setTimeout(()=>spawnEnemy(),parseInt(Math.random()*2000));
		
		if(gameEnded){
			if(score>=highScore){
				highScore=score;
				highScoreDisplay.innerHTML="High Score: "+highScore;
			}	
			startButton.innerHTML="Recomeçar";
			score=0;
			
			//limpa todos os timeouts para nao spawnar mais inimigos
			var id = window.setTimeout(function() {}, 0);
			while (id--) {
				window.clearTimeout(id);
			}
			
			//remove todos os inimigos existentes
			Array.from(document.getElementsByClassName("enemy")).forEach(enemy => enemy.remove());
		}
		else{
			loopSpawn();
		}
	},spawnDelay);
}
//mostra um popup com o texto escolhido
function displayPopup(text){
	var popup=document.getElementsByClassName("popup")[0]
	popup.style.display="block";
	popup.style.animation="none";
	popup.offsetHeight;
	popup.style.animation=null;
	popup.innerHTML=text;
}
//spawna um inimigo
function spawnEnemy(){
	var game=document.getElementsByClassName("game")[0];
	var enemy=document.createElement("div");
	var ratio=window.visualViewport.width/window.visualViewport.height
	//tamanho dos inimigos que varia dependendo da resolução da tela
	var enemySize=ratio>=1?8:16;
		
	enemy.classList.add("enemy");
	//altura aleatoria onde o inimigo vai spawnar. Vai ser sempre entre a base e o topo do elemento de classe game
	enemy.style.bottom=parseInt(Math.random()*(100*(game.offsetHeight/window.visualViewport.width)-enemySize))+"vw"
	
	//adiciona evento quando o inimigo chega no final que acaba o jogo
	enemy.addEventListener('animationend',
	function(e){
		gameEnded=true;
	});
	
	game.appendChild(enemy);
}