import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Upload, Image, Type, Check, AlertCircle, Code, Download } from 'lucide-react';

export function LogoCustomizationGuide() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Logo Customization Guide
          </CardTitle>
          <p className="text-sm text-gray-600">
            Learn how to add your own logo to replace the default "CareConnect" text.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Quick Setup */}
          <div>
            <h3 className="text-lg mb-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              Quick Setup
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 mb-3">
                To add your logo, simply update the <code className="bg-white px-2 py-1 rounded text-xs">logoUrl</code> in App.tsx:
              </p>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div className="text-gray-600">// In App.tsx, update the logoConfig object:</div>
                <div className="mt-2">
                  <span className="text-blue-600">const</span> logoConfig = {'{'}
                  <br />
                  <span className="ml-4 text-green-600">logoUrl: '/path/to/your/logo.svg'</span>, <span className="text-gray-500">// Add your logo here</span>
                  <br />
                  <span className="ml-4">alt: 'Your Company Logo',</span>
                  <br />
                  <span className="ml-4">fallbackText: 'Your App Name'</span>
                  <br />
                  {'};'}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Logo Requirements */}
          <div>
            <h3 className="text-lg mb-3">Logo Requirements & Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  File Format
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>SVG (Recommended)</span>
                    <Badge className="bg-green-100 text-green-700">Best</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PNG with transparency</span>
                    <Badge variant="outline">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>JPG/JPEG</span>
                    <Badge variant="outline">Basic</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Dimensions
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Width:</span>
                    <span>150-200px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Height:</span>
                    <span>40-60px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aspect Ratio:</span>
                    <span>3:1 to 4:1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Logo Placement Options */}
          <div>
            <h3 className="text-lg mb-3">Where to Place Your Logo Files</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm mb-2">Option 1: Public Folder (Recommended)</h4>
                <div className="font-mono text-sm bg-white p-2 rounded border">
                  /public/logo.svg<br />
                  /public/images/logo.png
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Then use: <code>logoUrl: '/logo.svg'</code>
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm mb-2">Option 2: External URL</h4>
                <div className="font-mono text-sm bg-white p-2 rounded border">
                  https://your-domain.com/logo.svg<br />
                  https://cdn.example.com/logo.png
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Then use: <code>logoUrl: 'https://your-domain.com/logo.svg'</code>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Size Variants */}
          <div>
            <h3 className="text-lg mb-3">Logo Size Variants</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">S</div>
                  <span>Small (24px height)</span>
                </div>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">size="sm"</code>
              </div>
              <div className="flex items-center justify-between p-3 border rounded bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm">M</div>
                  <span>Medium (32px height) - Default</span>
                </div>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">size="md"</code>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center text-white">L</div>
                  <span>Large (48px height)</span>
                </div>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">size="lg"</code>
              </div>
            </div>
          </div>

          <Separator />

          {/* Code Examples */}
          <div>
            <h3 className="text-lg mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Code Examples
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm mb-2">Basic Logo Setup:</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <div className="text-green-400">// In App.tsx</div>
                  <div className="text-blue-300">const</div> logoConfig = {'{'}
                  <br />
                  <span className="ml-4 text-yellow-300">logoUrl:</span> <span className="text-red-300">'/my-logo.svg'</span>,
                  <br />
                  <span className="ml-4 text-yellow-300">alt:</span> <span className="text-red-300">'My Company Logo'</span>,
                  <br />
                  <span className="ml-4 text-yellow-300">fallbackText:</span> <span className="text-red-300">'My App'</span>
                  <br />
                  {'};'}
                </div>
              </div>

              <div>
                <h4 className="text-sm mb-2">Using Logo Component Directly:</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <div className="text-blue-300">{'<Logo'}</div>
                  <br />
                  <span className="ml-4 text-yellow-300">logoUrl=</span><span className="text-red-300">"/logo.svg"</span>
                  <br />
                  <span className="ml-4 text-yellow-300">alt=</span><span className="text-red-300">"Company Logo"</span>
                  <br />
                  <span className="ml-4 text-yellow-300">fallbackText=</span><span className="text-red-300">"Company Name"</span>
                  <br />
                  <span className="ml-4 text-yellow-300">size=</span><span className="text-red-300">"md"</span>
                  <br />
                  <div className="text-blue-300">{'/>'}</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Troubleshooting */}
          <div>
            <h3 className="text-lg mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              Troubleshooting
            </h3>
            
            <div className="space-y-3">
              <div className="border border-yellow-200 bg-yellow-50 p-3 rounded-lg">
                <h4 className="text-sm text-yellow-800 mb-1">Logo not showing?</h4>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Check the file path is correct</li>
                  <li>• Ensure the logo file exists in the public folder</li>
                  <li>• Verify the image format is supported</li>
                  <li>• Check browser console for error messages</li>
                </ul>
              </div>

              <div className="border border-blue-200 bg-blue-50 p-3 rounded-lg">
                <h4 className="text-sm text-blue-800 mb-1">Logo appears blurry?</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Use SVG format for crisp scaling</li>
                  <li>• Ensure PNG is high resolution (2x pixel density)</li>
                  <li>• Check logo dimensions match recommended sizes</li>
                </ul>
              </div>

              <div className="border border-green-200 bg-green-50 p-3 rounded-lg">
                <h4 className="text-sm text-green-800 mb-1">Logo too large/small?</h4>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Adjust the size prop: "sm", "md", or "lg"</li>
                  <li>• Modify the original image dimensions</li>
                  <li>• Use CSS classes for custom sizing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Logo
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
            <Button variant="outline">
              <Type className="w-4 h-4 mr-2" />
              Use Text Logo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}