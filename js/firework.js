window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};var mx,my,canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),cw=window.innerWidth,ch=window.innerHeight,fireworks=[],particles=[],hue=120,limiterTotal=5,limiterTick=0,timerTotal=80,timerTick=0,mousedown=!1;function random(t,i){return Math.random()*(i-t)+t}function calculateDistance(t,i,e,s){var a=t-e,o=i-s;return Math.sqrt(Math.pow(a,2)+Math.pow(o,2))}function Firework(t,i,e,s){for(this.x=t,this.y=i,this.sx=t,this.sy=i,this.tx=e,this.ty=s,this.distanceToTarget=calculateDistance(t,i,e,s),this.distanceTraveled=0,this.coordinates=[],this.coordinateCount=3;this.coordinateCount--;)this.coordinates.push([this.x,this.y]);this.angle=Math.atan2(s-i,e-t),this.speed=2,this.acceleration=1.05,this.brightness=random(50,70),this.targetRadius=1}function Particle(t,i){for(this.x=t,this.y=i,this.coordinates=[],this.coordinateCount=5;this.coordinateCount--;)this.coordinates.push([this.x,this.y]);this.angle=random(0,2*Math.PI),this.speed=random(1,10),this.friction=.95,this.gravity=1,this.hue=random(hue-50,hue+50),this.brightness=random(50,80),this.alpha=1,this.decay=random(.015,.03)}function createParticles(t,i){for(var e=30;e--;)particles.push(new Particle(t,i))}function loop(){requestAnimFrame(loop),hue=random(0,360),ctx.globalCompositeOperation="destination-out",ctx.fillStyle="rgba(0, 0, 0, 0.5)",ctx.fillRect(0,0,cw,ch),ctx.globalCompositeOperation="lighter";for(var t=fireworks.length;t--;)fireworks[t].draw(),fireworks[t].update(t);for(t=particles.length;t--;)particles[t].draw(),particles[t].update(t);timerTotal<=timerTick?mousedown||(fireworks.push(new Firework(cw/2,ch,random(0,cw),random(0,ch/2))),timerTick=0):timerTick++,limiterTotal<=limiterTick?mousedown&&(fireworks.push(new Firework(cw/2,ch,mx,my)),limiterTick=0):limiterTick++}canvas.width=cw,canvas.height=ch,Firework.prototype.update=function(t){this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.targetRadius<8?this.targetRadius+=.3:this.targetRadius=1,this.speed*=this.acceleration;var i=Math.cos(this.angle)*this.speed,e=Math.sin(this.angle)*this.speed;this.distanceTraveled=calculateDistance(this.sx,this.sy,this.x+i,this.y+e),this.distanceTraveled>=this.distanceToTarget?(createParticles(this.tx,this.ty),fireworks.splice(t,1)):(this.x+=i,this.y+=e)},Firework.prototype.draw=function(){ctx.beginPath(),ctx.moveTo(this.coordinates[this.coordinates.length-1][0],this.coordinates[this.coordinates.length-1][1]),ctx.lineTo(this.x,this.y),ctx.strokeStyle="hsl("+hue+", 100%, "+this.brightness+"%)",ctx.stroke(),ctx.beginPath(),ctx.arc(this.tx,this.ty,this.targetRadius,0,2*Math.PI),ctx.stroke()},Particle.prototype.update=function(t){this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.speed*=this.friction,this.x+=Math.cos(this.angle)*this.speed,this.y+=Math.sin(this.angle)*this.speed+this.gravity,this.alpha-=this.decay,this.alpha<=this.decay&&particles.splice(t,1)},Particle.prototype.draw=function(){ctx.beginPath(),ctx.moveTo(this.coordinates[this.coordinates.length-1][0],this.coordinates[this.coordinates.length-1][1]),ctx.lineTo(this.x,this.y),ctx.strokeStyle="hsla("+this.hue+", 100%, "+this.brightness+"%, "+this.alpha+")",ctx.stroke()},canvas.addEventListener("mousemove",function(t){mx=t.pageX-canvas.offsetLeft,my=t.pageY-canvas.offsetTop}),canvas.addEventListener("mousedown",function(t){t.preventDefault(),mousedown=!0}),canvas.addEventListener("mouseup",function(t){t.preventDefault(),mousedown=!1}),window.onload=loop;
