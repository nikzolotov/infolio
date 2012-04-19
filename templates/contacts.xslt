<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template match="contacts">
		<div class="l-column-270">
			<div class="h-column-60">
				<img class="b-small-logo" src="./img/logo-small.png" alt="Infolio"/>
				<ul class="b-contacts">
					<xsl:if test="email/text()">
						<li class="item">
							<a class="link" href="mailto:{email/text()}">
								<xsl:value-of select="email/text()"/>
							</a>
						</li>
					</xsl:if>
					<xsl:if test="email/text()">
						<li class="item phone g-nobr">
							<xsl:value-of select="phone/text()"/>
						</li>
					</xsl:if>
					<xsl:if test="address/text()">
						<li class="item address">
							<xsl:copy-of select="address/*|address/text()"/>
						</li>
					</xsl:if>
				</ul>
			</div>
		</div>
		<div class="l-column-260">
			<div class="h-column-60">
				<ul class="b-social-links">
					<li class="item qr">
						<img class="image" src="./img/content/qr.png" alt="QR-код"/>
						<span class="desc">Добавьте нас в&#160;список контактов</span>
					</li>
					<xsl:if test="twitter-href/text()">
						<li class="item">
							<a class="link" href="{twitter-href/text()}" target="_blank">
								<b class="b-icon b-icon-twitter">
									<b><xsl:text><![CDATA[]]></xsl:text></b>
								</b>
								<xsl:text> Читайте нас в&#160;Twitter</xsl:text>
							</a>
						</li>
					</xsl:if>
					<xsl:if test="facebook-href/text()">
						<li class="item">
							<a class="link" href="{facebook-href/text()}" target="_blank">
								<b class="b-icon b-icon-facebook">
									<b><xsl:text><![CDATA[]]></xsl:text></b>
								</b>
								<xsl:text> Расскажите о&#160;нас в&#160;Facebook</xsl:text>
							</a>
						</li>
					</xsl:if>
				</ul>
			</div>
		</div>
	</xsl:template>
	
</xsl:stylesheet>