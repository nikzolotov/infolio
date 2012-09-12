<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template match="services">
	<!--
		<ul class="b-clients">
			<xsl:apply-templates select="client"/>
		</ul>
	-->
		<ul>
			<xsl:attribute name="class">
				<xsl:text>b-tab-links b-tab-links-</xsl:text>
				<xsl:value-of select="count(service)"/>
			</xsl:attribute>
			<xsl:apply-templates select="service" mode="navigation"/>
		</ul>
		<div class="b-tabs">
			<div class="b-tabs-inner">
				<xsl:apply-templates select="service"/>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="service" mode="navigation">
		<li class="item">
			<xsl:if test="position() = last()">
				<xsl:attribute name="class">item last</xsl:attribute>
			</xsl:if>
			<a class="link" href="#tab-{@key}">
				<xsl:value-of select="@title"/>
				<b class="b-icon b-icon-current-b">
					<b><xsl:text><![CDATA[]]></xsl:text></b>
				</b>
			</a>
		</li>
	</xsl:template>
	
	<xsl:template match="service">
		<div id="tab-{@key}" class="b-tab">
			<xsl:if test="position() != 1">
				<xsl:attribute name="style">display: none;</xsl:attribute>
			</xsl:if>
			<xsl:copy-of select="*"/>
		</div>
	</xsl:template>
	
</xsl:stylesheet>