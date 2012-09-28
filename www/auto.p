@auto[]
	$DATA_DIR[/xml]
	$TEMPLATES_DIR[/../templates]
	$UPLOAD_DIR[/upload]
	
	$XSL_OUTPUT[
		$.method[xml]
		$.indent[yes]
		$.omit-xml-declaration[yes]
	]
	
	$SYSTEM_EMAIL[hi@infolio.ru]

@managersEmail[_type]
	$managers[^table::load[/../resources/managers.cfg]]
	$managersColumns[^managers.columns[]]
	
	^managersColumns.menu{
		^if($managersColumns.column eq $_type){
			$managers[^managers.select($managers.$_type == 1)]
		}
	}
	
	$result[^managers.menu{$managers.email}[, ]]

@replaceNewlinesByBr[_text]
	^if(def $_text){
		$result[^_text.match[\n][g]{<br/>}]
	}

@GET_ip[]
	$result[$env:REMOTE_ADDR]
	^if(def $env:HTTP_X_FORWARDED_FOR){
		$result[$env:HTTP_X_FORWARDED_FOR]
	}