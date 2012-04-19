<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template match="projects">
		<div class="b-tabs">
			<div class="b-tabs-inner">
				<xsl:apply-templates select="project"/>
			</div>
		</div>
		<ul class="b-circle-tab-links">
			<xsl:apply-templates select="project" mode="navigation"/>
		</ul>
	</xsl:template>
	
	<xsl:template match="project">
		<div id="tab-portfolio-{@key}" class="b-tab b-project">
			<xsl:if test="position() &gt; 1">
				<xsl:attribute name="style">display: none;</xsl:attribute>
			</xsl:if>
			<div class="illustrations">
				<xsl:apply-templates select="frames/image[1]" mode="main"/>
			</div>
			<div class="intro">
				<h3 class="title">
					<xsl:value-of select="title/text()"/>
				</h3>
				<div class="meta">
					<a class="link" href="http://{link/text()}/" target="_blank">
						<xsl:if test="link/@href">
							<xsl:attribute name="href">
								<xsl:value-of select="link/@href"/>
							</xsl:attribute>
						</xsl:if>
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
			<xsl:apply-templates select="frames"/>
		</div>
	</xsl:template>
	
	<xsl:template match="frames">
		<ul class="b-previews">
			<xsl:apply-templates select="image"/>
		</ul>
	</xsl:template>
	
	<xsl:template match="image">
		<li class="item">
			<a class="link" href="./img/projects/{../../@key}/{@file}" title="{@alt}">
				<xsl:if test="position() = 1">
					<xsl:attribute name="class">link selected</xsl:attribute>
				</xsl:if>
				<img class="b-previews-image" src="./img/projects/{../../@key}/{@thumbnail}" alt="{@alt}" width="70" height="70"/>
			</a>
		</li>
	</xsl:template>
	
	<xsl:template match="image" mode="main">
		<img class="illustration" src="./img/projects/{../../@key}/{@file}" alt="{@alt}"/>
	</xsl:template>
	
	<xsl:template match="project" mode="navigation">
		<li class="item">
			<a class="link" href="#tab-portfolio-{@key}">
				<xsl:value-of select="position()"/>
			</a>
		</li>
	</xsl:template>
	
</xsl:stylesheet>