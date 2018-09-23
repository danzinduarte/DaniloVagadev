$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var tbPratos = localStorage.getItem("tbPratos");// Recupera os dados armazenados

	tbPratos = JSON.parse(tbPratos); // Converte string para objeto

	if(tbPratos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbPratos = [];

	function Adicionar(){
		var cliente = JSON.stringify({
			Rest   : $("#txtRest").val(),
			Nome     : $("#txtNome").val(),
			Preco : $("#txtPreco").val(),
			
		});

		tbPratos.push(cliente);
		localStorage.setItem("tbPratos", JSON.stringify(tbPratos));
		alert("Registro adicionado.");
		return true;

	}

	function Editar(){
		tbPratos[indice_selecionado] = JSON.stringify({
		Rest   : $("#txtRest").val(),
		Nome     : $("#txtNome").val(),
		Preco : $("#txtPreco").val(),
		});
		localStorage.setItem("tbPratos", JSON.stringify(tbPratos));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}
	
	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Restaurante</th>"+
			"	<th>Prato</th>"+
			"	<th>Preço</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbPratos){
			var cli = JSON.parse(tbPratos[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' alt='"+i+"' class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 "	<td>"+cli.Rest+"</td>" + 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Preco+"</td>" + 
										 "</tr>");
		 }
	}

	function Excluir(){
		tbPratos.splice(indice_selecionado, 1);
		localStorage.setItem("tbPratos", JSON.stringify(tbPratos));
		alert("Registro excluído.");
	}

	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in tbPratos) {
            var i = JSON.parse(tbPratos[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}

	Listar();

	$("#frmCadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
       	indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbPratos[indice_selecionado]);
		$("#txtRest").val(cli.Rest);
		$("#txtNome").val(cli.Nome);
		$("#txtPreco").val(cli.Preco);
		$("#txtNome").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});


});