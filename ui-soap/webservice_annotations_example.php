<?php
use Swagger\Annotations as SWG;

/**
 * @SWG\Info(
 * title="Webservice description test",
 * description="file wsdl em http://localhost/swaggersoap/webservice/wsdl"
 * )
 *
 * @SWG\Resource(
 * apiVersion="1.2",
 * swaggerVersion="1.2",
 * description="WebService test",
 * resourcePath="/swaggersoap",
 * produces="['application/xml']",
 * consumes="['application/xml']",
 * basePath="http://localhost/swaggersoap/webservice.php",
 * )
 */
class WsTest {
	
	/**
	 * @SWG\Api(
	 * path="#call_echo",
	 * @SWG\Operation(
	 * nickname="call_echo",
	 * method="POST",
	 * summary="Call to return echo.",
	 * notes="Method test",
	 * consumes="['application/xml']",
	 * @SWG\Parameters(
	 * @SWG\Parameter(
	 * name="word",
	 * description="Word to echo (all parameters type paramType='path')",
	 * paramType="path",
	 * required=true,
	 * allowMultiple=false,
	 * type="string"
	 * ),
	 * @SWG\Parameter(
	 * name="XML",
	 * description="XML to send (this parameter is required for receive XML generated)",
	 * paramType="body",
	 * required=true,
	 * allowMultiple=false,
	 * type="XML"
	 * )
	 * )
	 * )
	 * )
	 */
	
	/**
	 * @param string $word         	
	 * @return string
	 */
	public function call_echo($word) {
		return $word;
	}
	        
}
