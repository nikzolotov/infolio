<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template match="clients">
		<ul class="b-clients">
			<xsl:apply-templates select="client"/>
		</ul>
	</xsl:template>
	
	<xsl:template match="client">
		<li class="item">
			<img class="image" src="./img/clients/{@key}.png" alt="{text()}" width="150" height="76"/>
		</li>
	</xsl:template>
	
</xsl:stylesheet>