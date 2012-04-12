<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template match="projects">
		<xsl:apply-templates select="project"/>
		<ul class="b-circle-tabs">
			<xsl:apply-templates select="project" mode="navigation"/>
		</ul>
	</xsl:template>
	
	<xsl:template match="project">
		<div id="tab-portfolio-{@key}" class="b-project">
			<div class="illustrations">
				<xsl:apply-templates select="gallery/image[1]" mode="main"/>
			</div>
			<div class="intro">
				<h3 class="title">
					<xsl:value-of select="title/text()"/>
				</h3>
				<div class="meta">
					<a class="link" href="http://{link/text()}/">
						<xsl:value-of select="link/text()"/>
					</a>
					<br/>
					<xsl:value-of select="year/text()"/>
				</div>
			</div>
			<div class="desc">
				<p>
					<xsl:if test="desc/@style">
						<xsl:copy-of select="desc/@style"/>
					</xsl:if>
					<xsl:value-of select="desc/text()"/>
				</p>
			</div>
			<xsl:apply-templates select="gallery"/>
		</div>
	</xsl:template>
	
	<xsl:template match="gallery">
		<ul class="b-previews">
			<xsl:apply-templates select="image"/>
		</ul>
	</xsl:template>
	
	<xsl:template match="image">
		<li class="item">
			<a class="link" href="./img/projects/{../../@key}/{fullsize/name/text()}" title="{fullsize/title/text()}">
				<xsl:if test="position() = 1">
					<xsl:attribute name="class">link selected</xsl:attribute>
				</xsl:if>
				<img class="image" src="./img/projects/{../../@key}/{preview/name/text()}" alt="{preview/title/text()}" width="70" height="70"/>
				<i class="overlay"><xsl:text><![CDATA[]]></xsl:text></i>
			</a>
		</li>
	</xsl:template>
	
	<xsl:template match="image" mode="main">
		<img class="illustration" src="./img/projects/{../../@key}/{fullsize/name/text()}" alt="{fullsize/title/text()}"/>
	</xsl:template>
	
	<xsl:template match="project" mode="navigation">
		<li class="item">
			<a class="link" href="#tab-portfolio-{@key}">
				<xsl:value-of select="position()"/>
			</a>
		</li>
	</xsl:template>
	
</xsl:stylesheet>