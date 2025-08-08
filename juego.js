
var juego = {
  dimension: 3,
  filas: [[],[],[]],
  espacioVacio: {
    fila: 2,
    columna: 2
},

  crearPieza: function(numero, fila, columna) {

    var nuevoElemento = $('<div>');
        nuevoElemento.addClass('pieza');
        nuevoElemento.css({
      
        backgroundImage:'url(./piezas/' + numero + '.jpg)',
        top: fila * 200,
        left: columna * 200
    
    });

    return {
      
      el: nuevoElemento,
      numero: numero,
      filaInicial: fila,
      columnaInicial: columna,
    
    };
},

  iniciarPieza: function(contenedor) {
    
    var counter = 1;

    for (var fila=0; fila<this.dimension; fila++){

    for (var columna=0; columna<this.dimension; columna++){

        if (this.espacioVacio.fila==fila && this.espacioVacio.columna==columna){
              this.filas[fila][columna]=null;
        }else{
          var pieza=this.crearPieza(counter++,fila,columna)
          contenedor.append(pieza.el)
          this.filas[fila][columna]=pieza;
        
        }}}
},

capturarTeclas: function(){
      var that = this;
      $("body").on("keydown",function(evento){
        console.log(evento.which);
        switch(evento.which){
          case 37:
            console.log("izquierda");
            that.moverHaciaLaIzquierda();
          break;

          case 38:
            console.log("arriba");
            that.moverHaciaArriba();
          break;

          case 39:
            console.log("derecha");
            that.moverHaciaLaDerecha();
          break;

          case 40:
            console.log("abajo");
            that.moverHaciaAbajo();
          break;

          default: return;
        }
      
          that.chequearSiGano()

      });
},

    iniciar:function(tablero){

    this.iniciarPieza(tablero);
    this.mezclarFichas(200);
    this.capturarTeclas();
},
    
    moverHaciaLaIzquierda: function(){
      var filaOrigen=juego.espacioVacio.fila;
      var columnaOrigen=juego.espacioVacio.columna+1;
      juego.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
},
    
    moverHaciaLaDerecha: function(){
      var filaOrigen=juego.espacioVacio.fila;
      var columnaOrigen=juego.espacioVacio.columna-1;
      juego.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
},
  
    moverHaciaArriba: function(){
      var filaOrigen=juego.espacioVacio.fila+1;
      var columnaOrigen=juego.espacioVacio.columna;
      juego.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
},

    moverHaciaAbajo: function(){
      var filaOrigen=juego.espacioVacio.fila-1;
      var columnaOrigen=juego.espacioVacio.columna;
      juego.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
},

    intercambiarPosicionConEspacioVacio: function(fila, columna){
      var pieza=(this.filas[fila] && this.filas[fila][columna]);
        if(pieza){
          juego.filas[this.espacioVacio.fila][this.espacioVacio.columna] = pieza;
          juego.moverFichaFilaColumna(pieza, this.espacioVacio.fila, this.espacioVacio.columna);
          juego.guardarEspacioVacio(fila, columna);
    
    }
},

    moverFichaFilaColumna:function(pieza, fila, columna){
      pieza.el.css({
        top: fila*200,
        left: columna*200,
    
    })
},
  
  guardarEspacioVacio:function(fila, columna){
    this.espacioVacio.fila = fila;
    this.espacioVacio.columna = columna;
    this.filas[fila][columna] = null;
},

  mezclarFichas(veces){
    if (veces<=0) {return;}

      var that = this;
      var funciones = ["moverHaciaAbajo", "moverHaciaArriba", "moverHaciaLaDerecha", "moverHaciaLaIzquierda"];
      var numeroRandom = Math.floor(Math.random()*4);
      var nombreDeFuncion = funciones[numeroRandom];
      this[nombreDeFuncion]();

      setTimeout(function(){
      that.mezclarFichas(veces-1);
    },10);
  },
  
  chequearSiGano(){
      for (var f = 0; f < this.filas.length; f++) {
      for (var c = 0; c < this.filas.length; c++) {
        var ficha = this.filas[f][c];
          if (ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)) {
          
          return false;
        
        }}}
    
      setTimeout(function(){
          return alert("¡GANASTE!");
    }, 300)
  },
};

$(function(){
  
  var contenedor = $('#juego');
  juego.iniciar(contenedor);
  
})
