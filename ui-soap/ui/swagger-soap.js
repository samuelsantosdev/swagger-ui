/*
 * @Copyright (c) 2015 Samuel Santos (samuelsantosdev@gmail.com)
 * @Page https://github.com/samuelsantosdev
 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * @Version: 0.1
 * @Release: 2015-01-19
 */

$.fn.swaggerSOAP = function(settings) {
    
	/*
     * 
     * Settings default
     * 
     */
    var defaults = {
    	startDag : 'SOAP-ENV',
        swaggerUi : {},
        swaggerApi : {}
    };

    //load settings
    settings = $.extend(defaults, settings);
    
    /**
     * ReplaceAll to string
     * 
     * @param {string} de
     * @param {string} para
     * @returns {String}
     */
    String.prototype.replaceAll = function(de, para)
    {
        var str = this;
        var pos = str.indexOf(de);
        while (pos > -1){
            str = str.replace(de, para);
            pos = str.indexOf(de);
        }
        return (str);
    }
     
    return this.each(function() {
        
        var ws 			= settings.swaggerApi.resourcePath.replace('/', '');
        var arrXml 		= new Array;
        
        /**
         * Create XML SOAP envelope
         * 
         * @param {type} SwaggerUI
         * @returns {string}
         */
        var mountEnvelopes = function(swaggerUi, ws, basePath)
        {
            var l = 0;
            
            for(x in swaggerUi.operations){

            	strXml = '<?xml version="1.0" encoding="utf-8"?>\n';
                strXml += '<{startDag}:Envelope xmlns:{startDag}="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ns="'+basePath+'">\n<{startDag}:Header/>\n<{startDag}:Body>\n<ns:'+swaggerUi.operationsArray[l].nickname+' {startDag}:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\n';
                params = swaggerUi.operationsArray[l].parameters;
                for(p in swaggerUi.operationsArray[l].parameters){
                    if(params[p].paramType == 'path')
                        strXml=strXml+'\t<'+params[p].name+' xsi:type="xsd:'+params[p].type+'"></'+params[p].name+'>\n\ ';
                }
                strXml = strXml+'</ns:'+swaggerUi.operationsArray[l].nickname+'>\n</{startDag}:Body>\n</{startDag}:Envelope>';
                strXml = strXml.replaceAll('{startDag}', settings.startDag);
                arrXml[ws+'_'+x] = strXml;
                
                l++;
            }
        }
        
        /**
         * Update XML 
         * 
         * @param {type} obj
         * @returns {string}
         */
        var loadXml = function(obj)
        {
            var idElem = $(obj).parents('.operation').attr('id');
            idContent = idElem;
            inputsParameter = $("#"+idContent+' input.parameter');
            xmlReplaced = arrXml[idElem];
            $.each(inputsParameter, function(k, j){
                var nameElem = $(j).attr('name');
                valuePressed = $("#"+idContent+' input[name='+nameElem+']').val();
                xmlReplaced = xmlReplaced.replace('></'+nameElem+'>', '>'+valuePressed+'</'+nameElem+'>');                    
            });
            $("#"+idContent + '_content > form > table > tbody > tr > td > textarea').text(xmlReplaced);
        }
        
        
        mountEnvelopes(settings.swaggerUi.api[ws], ws, settings.swaggerApi.basePath);
        
        //bind keyup to update XML
        $(this).keyup(function(){
              loadXml($(this));
        });
        
        //highlight to XML return
        $('pre code').each(function(i, e) {
              htmlInner = $(e).text();
              $(e).html(htmlInner.replaceAll('{', '[').replaceAll('}', ']'));
            	hljs.highlightBlock(e)
        });

        //Insert XML envelope in all textareas
        $.each(settings.swaggerUi.api[ws].operations, function(x, y){
              idContent = '#'+ws+'_'+x+'_content';
              $(idContent+' > form > table > tbody > tr > td > textarea').text(arrXml[ws+'_'+x]);
        });
        
    });
}