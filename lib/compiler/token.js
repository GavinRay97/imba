var __root = {};
// imba$inlineHelpers=1

var TOK = exports.TOK = {};
var TTERMINATOR = TOK.TERMINATOR = 1;
var TIDENTIFIER = TOK.IDENTIFIER = TOK.IVAR = 2;
var CONST = TOK.CONST = 3;
var VAR = TOK.VAR = 4;
var IF = TOK.IF = 5;
var ELSE = TOK.ELSE = 6;
var DEF = TOK.DEF = 7;

function Token(type,value,loc,len){
	this._type = type;
	this._value = value;
	this._loc = (loc != null) ? loc : (-1);
	this._len = len || 0;
	this._meta = null;
	this.generated = false;
	this.newLine = false;
	this.spaced = false;
	this.call = false;
	return this;
};

exports.Token = Token; // export class 
Token.prototype.type = function (){
	return this._type;
};

Token.prototype.value = function (){
	return this._value;
};

Token.prototype.traverse = function (){
	return;
};

Token.prototype.c = function (){
	return "" + this._value;
};

Token.prototype.toString = function (){
	return this._value;
};

Token.prototype.charAt = function (i){
	return this._value.charAt(i);
};

Token.prototype.slice = function (i){
	return this._value.slice(i);
};

Token.prototype.region = function (){
	return [this._loc,this._loc + (this._len || this._value.length)];
};

Token.prototype.sourceMapMarker = function (){
	return (this._loc == -1) ? ':' : (("%$" + (this._loc) + "$%"));
	// @col == -1 ? '' : "%%{@line}${@col}%%"
};


__root.lex = function (){
	var token = this.tokens[this.pos++];
	var ttag;
	
	if (token) {
		ttag = token._type;
		this.yytext = token;
	} else {
		ttag = '';
	};
	
	return ttag;
}; exports.lex = __root.lex;


// export def token typ, val, line, col, len do Token.new(typ,val,line, col or 0, len or 0) # [null,typ,val,loc]
__root.token = function (typ,val){
	return new Token(typ,val,-1,0);
}; exports.token = __root.token;

__root.typ = function (tok){
	return tok._type;
}; exports.typ = __root.typ;
__root.val = function (tok){
	return tok._value;
}; exports.val = __root.val; // tok[offset + 1]
__root.line = function (tok){
	return tok._line;
}; exports.line = __root.line; // tok[offset + 2]
__root.loc = function (tok){
	return tok._loc;
}; exports.loc = __root.loc; // tok[offset + 2]

__root.setTyp = function (tok,v){
	return tok._type = v;
}; exports.setTyp = __root.setTyp;
__root.setVal = function (tok,v){
	return tok._value = v;
}; exports.setVal = __root.setVal;
__root.setLine = function (tok,v){
	return tok._line = v;
}; exports.setLine = __root.setLine;
__root.setLoc = function (tok,v){
	return tok._loc = v;
}; exports.setLoc = __root.setLoc;


var LBRACKET = exports.LBRACKET = new Token('{','{',0,0,0);
var RBRACKET = exports.RBRACKET = new Token('}','}',0,0,0);

var LPAREN = exports.LPAREN = new Token('(','(',0,0,0);
var RPAREN = exports.RPAREN = new Token(')',')',0,0,0);

LBRACKET.generated = true;
RBRACKET.generated = true;
LPAREN.generated = true;
RPAREN.generated = true;

var INDENT = exports.INDENT = new Token('INDENT','2',0,0,0);
var OUTDENT = exports.OUTDENT = new Token('OUTDENT','2',0,0,0);
