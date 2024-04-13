'use strict';

App.Art.Engine = class {
	getVsSourceGeometry() {
		return  `#version 300 es
				uniform mat4 matModelViewProjection;
				uniform mat4 matModelView;
				uniform mat4 matNormal;

				uniform mat4 matModelViewProjectionShadow;

				in vec3 vertexNormal;
				in vec3 vertexPosition;
				in vec2 textureCoordinate;

				out vec2 textureCoord;
				out vec3 normal;
				out vec3 pos;
				out vec4 shadowMap;

				void main() {
					gl_Position = matModelViewProjection * vec4(vertexPosition, 1.0);
					normal = normalize((matNormal * vec4(vertexNormal, 1.0)).xyz);

					textureCoord = textureCoordinate;
					pos = (matModelView * vec4(vertexPosition, 1.0)).xyz;
					shadowMap = matModelViewProjectionShadow * vec4(vertexPosition, 1.0);
				}`;
	}

	getFsSourceGeometry() {
		return `#version 300 es
				precision highp float;

				layout(location = 0) out vec3 gPosition;
				layout(location = 1) out vec3 gNormal;

				uniform sampler2D alpha;
				uniform float d;

				in vec2 textureCoord;
				in vec3 pos;
				in vec3 normal;

				void main() {
					float map_d = d * texture(alpha, textureCoord).r;

					if (map_d < 0.85)
						discard;

					gPosition = pos;

					if (!gl_FrontFacing)
						gNormal = -normalize(normal);
					else
						gNormal = normalize(normal);
				}`;
	}

	getVsSourceShadow() {
		return  `#version 300 es
				uniform mat4 matModelViewProjectionShadow;
				uniform mat4 matModel;

				in vec3 vertexPosition;
				in vec2 textureCoordinate;

				out vec2 textureCoord;

				void main() {
					gl_Position = matModelViewProjectionShadow * vec4(vertexPosition, 1.0);
					textureCoord = textureCoordinate;
				}`;
	}

	getFsSourceShadow() {
		return `#version 300 es
				precision highp float;

				uniform sampler2D alpha;
				uniform float d;
				in vec2 textureCoord;
				out float gShadowDepth;

				void main() {
					float map_d = d * texture(alpha, textureCoord).r;

					if (map_d < 0.85)
						discard;

					gShadowDepth = gl_FragCoord.z;
				}`;
	}

	getVsSourceQuad() {
		return `#version 300 es
				in vec2 vertexPosition;
				in vec2 textureCoordinate;

				out vec2 textureCoord;

				void main() {
					textureCoord = textureCoordinate;
					gl_Position = vec4(vertexPosition, 0.0, 1.0);
				}`;
	}

	getFsSourceSSAO() {
		return `#version 300 es
				precision highp float;

				out float ao;

				in vec2 textureCoord;

				uniform sampler2D gPosition;
				uniform sampler2D gNormal;
				uniform sampler2D texNoise;

				uniform vec3 samples[32];

				uniform mat4 projection;
				uniform mat4 view;

				uniform float radius;
				uniform float bias;
				uniform float scale;

				void main() {
					vec2 resolution = vec2(textureSize(gPosition, 0));
					vec3 pos = texture(gPosition, textureCoord).xyz;
					vec3 normal = normalize(texture(gNormal, textureCoord).rgb);

					// tile noise texture over screen based on screen dimensions divided by noise size
					vec3 randomVec = normalize(texture(texNoise, textureCoord * resolution / vec2(3.0, 3.0)).xyz);

					// create TBN
					vec3 tangent = normalize(randomVec - normal * dot(randomVec, normal));
					vec3 bitangent = cross(normal, tangent);
					mat3 TBN = mat3(tangent, bitangent, normal);

					// iterate over the sample kernel and calculate occlusion factor
					float occlusion = 0.0;
					for(int i = 0; i < 32; i++)
					{
						// get sample position
						vec3 samplePos = TBN * samples[i]; // from tangent to view-space
						samplePos = pos + samplePos * radius;

						// project sample position
						vec4 offset = vec4(samplePos, 1.0);
						offset = projection * offset; // from view to clip-space
						offset.xy /= offset.w; // perspective divide
						offset.xy = offset.xy * 0.5 + 0.5; // transform to range 0.0 - 1.0

						float sampleDepth = texture(gPosition, offset.xy).z;

						// range check & accumulate
						float rangeCheck = smoothstep(0.0, 1.0, radius / abs(pos.z - sampleDepth));
						occlusion += (sampleDepth <= samplePos.z + bias ? 1.0 : 0.0) * rangeCheck;
					}
					ao = 1.0 - (occlusion / scale);
				}`;
	}

	getFsSourceSSAOBlur() {
		return `#version 300 es
				precision highp float;

				out float ao;
				in vec2 textureCoord;

				uniform sampler2D ssaoInput;
				uniform float blur;

				void main()
				{
					vec2 texelSize = 1.0 / vec2(textureSize(ssaoInput, 0));
					float ref = texture(ssaoInput, textureCoord).r;
					float result = 0.0;
					float counts = 0.0;

					for (float x = -blur; x <= blur; x++)
					{
						for (float y = -blur; y <= blur; y++)
						{
							vec2 offset = vec2(x, y) * texelSize;
							float value = texture(ssaoInput, textureCoord + offset).r;
							if (abs(value-ref) < 0.1) {
								result += value;
								counts += 1.0;
							}
						}
					}
					ao = result / counts;
				}`;
	}

	getFsSourceSSS() {
		return `#version 300 es
				precision highp float;

				out float iao;

				in vec2 textureCoord;

				uniform sampler2D gPosition;
				uniform sampler2D gNormal;
				uniform sampler2D texNoise;

				uniform vec3 samples[32];

				uniform mat4 projection;
				uniform mat4 view;

				uniform float radius;
				uniform float bias;
				uniform float scale;

				void main() {
					vec2 resolution = vec2(textureSize(gPosition, 0));
					vec3 pos = texture(gPosition, textureCoord).xyz;
					vec3 normal = -normalize(texture(gNormal, textureCoord).rgb);
					// tile noise texture over screen based on screen dimensions divided by noise size
					vec3 randomVec = normalize(texture(texNoise, textureCoord * resolution / vec2(3.0, 3.0)).xyz);

					// create TBN
					vec3 tangent = normalize(randomVec - normal * dot(randomVec, normal));
					vec3 bitangent = cross(normal, tangent);
					mat3 TBN = mat3(tangent, bitangent, normal);

					// iterate over the sample kernel and calculate occlusion factor
					float occlusion = 0.0;
					for(int i = 0; i < 32; i++)
					{
						// get sample position
						vec3 samplePos = TBN * samples[i]; // from tangent to view-space
						samplePos = pos + samplePos * radius;

						// project sample position
						vec4 offset = vec4(samplePos, 1.0);
						offset = projection * offset; // from view to clip-space
						offset.xy /= offset.w; // perspective divide
						offset.xy = offset.xy * 0.5 + 0.5; // transform to range 0.0 - 1.0

						float sampleDepth = texture(gPosition, offset.xy).z;

						// range check & accumulate
						float rangeCheck = smoothstep(0.0, 1.0, radius / abs(pos.z - sampleDepth));
						occlusion += (sampleDepth <= samplePos.z + bias ? 1.0 : 0.0) * rangeCheck;
					}
					iao = 1.0 - (occlusion / scale);
				}`;
	}

	getFsSourceSSSBlur() {
		return `#version 300 es
				precision highp float;

				out float iao;
				in vec2 textureCoord;

				uniform sampler2D sssInput;
				uniform float blur;

				void main()
				{
					vec2 texelSize = 1.0 / vec2(textureSize(sssInput, 0));
					float result = 0.0;
					for (float x = -blur; x <= blur; x++)
					{
						for (float y = -blur; y <= blur; y++)
						{
							vec2 offset = vec2(x, y) * texelSize;
							result += texture(sssInput, textureCoord + offset).r;
						}
					}
					iao = result / ((blur*2.0+1.0) * (blur*2.0+1.0));
				}`;
	}

	getFsSourceForwardPass(dl, pl) {
		return `#version 300 es
		precision highp float;

		uniform float lightInt[${dl}];
		uniform vec3 lightAmb[${dl}];
		uniform vec3 lightColor[${dl}];
		uniform vec3 lightVect[${dl}];

		uniform float pointLightInt[${pl}];
		uniform vec3 pointLightAmb[${pl}];
		uniform vec3 pointLightColor[${pl}];
		uniform vec3 pointLightPos[${pl}];

		uniform vec3 shadowDir;
		uniform float shadowBiasMin;
		uniform float shadowBiasMax;
		uniform float shadowIntensity;

		uniform float sssPower;
		uniform float sssDistortion;
		uniform float sssIntensity;
		uniform float sssAmbient;

		uniform float whiteM;
		uniform float gammaY;
		uniform float uchimuraP;
		uniform float uchimuraA;
		uniform float ssaoInt;
		uniform bool opaque;

		uniform float d;
		uniform vec3 Ka;
		uniform vec3 Ks;
		uniform vec3 Ke;
		uniform float Ni;
		uniform float r;
		uniform float m;
		uniform bool sss;

		uniform vec2 offset;
		uniform float angle;
		uniform float scale;

		uniform bool sNormals;
		uniform bool sSSAO;
		uniform bool sAO;
		uniform bool sIAO;
		uniform bool sAmbient;
		uniform bool sAlbedo;
		uniform bool sSpecular;
		uniform bool sEmission;
		uniform bool sAlpha;
		uniform bool sGamma;
		uniform bool sReinhard;
		uniform bool sUchimura;
		uniform bool sNormal;
		uniform bool sHDR;
		uniform bool sShadows;
		uniform bool sSSS;

		uniform bool overlay;

				uniform vec3 cameraPos;

				uniform sampler2D textSampler[10];

				in vec2 textureCoord;
				in vec3 normal;
				in vec3 pos;
				in vec4 shadowMap;

				out vec4 outputColor;

				const float PI = 3.14159265359;

				float distributionGGX(vec3 N, vec3 H, float roughness)
				{
					float a = roughness*roughness;
					float a2 = a*a;
					float NdotH = max(dot(N, H), 0.0);
					float NdotH2 = NdotH*NdotH;

					float num = a2;
					float denom = (NdotH2 * (a2 - 1.0) + 1.0);
					denom = PI * denom * denom;

					return num / denom;
				}

				float geometrySchlickGGX(float NdotV, float roughness)
				{
					float r = (roughness + 1.0);
					float k = (r*r) / 8.0;

					float num = NdotV;
					float denom = NdotV * (1.0 - k) + k;

					return num / denom;
				}

				float geometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
				{
					float NdotV = max(dot(N, V), 0.0);
					float NdotL = max(dot(N, L), 0.0);
					float ggx2 = geometrySchlickGGX(NdotV, roughness);
					float ggx1 = geometrySchlickGGX(NdotL, roughness);

					return ggx1 * ggx2;
				}

				vec3 fresnelSchlick(float cosTheta, vec3 F0)
				{
					return F0 + (1.0 - F0) * pow(max(1.0 - cosTheta, 0.0), 5.0);
				}

				vec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)
				{
					return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(max(1.0 - cosTheta, 0.0), 5.0);
				}

				mat3 createTBNMatrix(vec3 position, vec2 coord, vec3 normal)
				{
					vec3 tangent = normalize(dFdx(position)*dFdy(coord).t - dFdy(position)*dFdx(coord).t);
					vec3 bitangent = cross(normal, tangent);
					return mat3(tangent, bitangent, normal);
				}

				vec3 tonemapUchimura(vec3 x, float P, float a) {
					// Uchimura 2017, "HDR theory and practice"
					// Math: https://www.desmos.com/calculator/gslcdxvipg
					// Source: https://www.slideshare.net/nikuque/hdr-theory-and-practicce-jp

					// const float P = 2.0;  // max display brightness
					// const float a = 1.0;  // contrast
					const float m = 0.22; // linear section start
					const float l = 0.4;  // linear section length
					const float c = 1.33; // black
					const float b = 0.0;  // pedestal

					float l0 = ((P - m) * l) / a;
					float S0 = m + l0;
					float S1 = m + a * l0;
					float C2 = (a * P) / (P - S1);
					float CP = -C2 / P;

					vec3 w0 = 1.0 - smoothstep(0.0, m, x);
					vec3 w2 = step(m + l0, x);
					vec3 w1 = 1.0 - w0 - w2;

					vec3 T = m * pow(x / m, vec3(c)) + b;
					vec3 S = P - (P - S1) * exp(CP * (x - S0));
					vec3 L = m + a * (x - m);

					return T * w0 + L * w1 + S * w2;
				}

				void main() {
					vec3 new_normal = normal;
					if (!gl_FrontFacing)
						new_normal = -normal;

					vec3 map_Ka = vec3(0.0,0.0,0.0);
					vec3 map_Ks = vec3(0.0,0.0,0.0);
					vec3 map_Ke = vec3(0.0,0.0,0.0);
					float map_d = 1.0;
					float ao = 1.0;
					float iao = 1.0;
					float shadow = 1.0;
					float roughness = 0.0;
					float metallic = 0.0;

					vec2 resolution = vec2(textureSize(textSampler[0], 0));
					vec2 coord = textureCoord - vec2(0.5, 0.5) - offset;
					coord = vec2(coord.x * cos(angle) - coord.y * sin(angle), coord.x * sin(angle) + coord.y * cos(angle));
					coord = coord / scale;
					coord = coord + vec2(0.5, 0.5);

					if (sAlpha)
						map_d = d * texture(textSampler[1], coord).r;

					if (!opaque) {
						if (map_d < 0.01 || map_d == 1.0)
							discard;
					} else {
						if (map_d < 0.85)
							discard;
					}

					if (sNormal) {
						vec3 map_Kn = texture(textSampler[5], coord).rgb *2.0-1.0;
						if (map_Kn != vec3(-1.0,-1.0,-1.0)) {
							mat3 TBN = createTBNMatrix(pos, textureCoord, new_normal);
							new_normal = normalize(TBN * map_Kn);
						}
					}

					if (sSSAO)
						ao = texture(textSampler[0], vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution).r;

					if (sSSS)
						iao = texture(textSampler[9], vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution).r;

					if (sAlbedo)
						map_Ka = Ka * texture(textSampler[2], coord).rgb;
					map_Ka += 0.0001;

					if (sSpecular) {
						map_Ks = Ks * texture(textSampler[3], coord).rgb;
						roughness = r * texture(textSampler[6], coord).r;
						metallic = m * texture(textSampler[7], coord).r;
					}

					if (sEmission)
						map_Ke = Ke * texture(textSampler[4], coord).rgb;

					if (sShadows) {
						vec3 projCoords = shadowMap.xyz/shadowMap.w * 0.5 + 0.5;
						float currentDepth = projCoords.z;
						float bias = max(shadowBiasMax * (1.0 - dot(new_normal, shadowDir)), shadowBiasMin);

						vec2 texelSize = 1.0 / vec2(textureSize(textSampler[8], 0));
						for(int x = -1; x <= 1; ++x)
						{
							for(int y = -1; y <= 1; ++y)
							{
								float pcfDepth = texture(textSampler[8], projCoords.xy + vec2(x, y) * texelSize).r;
								shadow += currentDepth - bias < pcfDepth ? 0.0 : 1.0;
							}
						}
						shadow /= 9.0;
						shadow = 1.0 - min(shadow * shadowIntensity, 1.0);
					}

					// material parameters
					vec3 albedo = pow(map_Ka, vec3(2.2));
					ao = pow(ao, ssaoInt);

					vec3 N = new_normal;
					vec3 V = normalize(-pos);
					vec3 F0 = mix(vec3(Ni), albedo, metallic);

					// reflectance equation
					vec3 Lo = vec3(0.0);
					vec3 Le = map_Ke;
					for (int i = 0; i < ${dl}; i++) {
						if (lightInt[i] <= 0.0)
							continue;

						// calculate per-light radiance
						vec3 L = -lightVect[i];
						vec3 H = normalize(V + L);
						vec3 radiance = lightColor[i] * lightInt[i];

						// cook-torrance brdf
						float NDF = distributionGGX(N, H, roughness);
						float G   = geometrySmith(N, V, L, roughness);
						vec3 F    = fresnelSchlickRoughness(max(dot(H, V), 0.0), F0, roughness);

						vec3 numerator = NDF * G * F;
						float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.00001;
						vec3 specular = numerator / denominator;

						// kS is equal to Fresnel
						vec3 kD = vec3(1.0) - F;
						kD *= 1.0 - min(metallic, 0.9999);

						// add to outgoing radiance Lo
						float NdotL = max(dot(N, L), 0.0);
						if (map_d >= 0.85 || overlay) {
							Lo += (kD * albedo / PI + specular * map_Ks) * radiance * NdotL * shadow * ao;
						}
						else {
							Lo += (kD * albedo / PI + specular * map_Ks) * radiance * NdotL;
						}

						// ambient lighting
						vec3 La = kD * albedo * (lightAmb[i]+0.0001);

						if (map_d >= 0.85 || overlay) {
							// sss
							if (sSSS && sss) {
								vec3 H_d = normalize(L + N * sssDistortion);
								float VdotH = pow(clamp(dot(V, -H_d), 0.0, 1.0), sssPower);
								Lo += (kD * albedo / PI + specular * map_Ks) * (VdotH+sssAmbient) * iao * sssIntensity * NdotL * shadow * ao;
							}

							// ao
							Lo += La * ao;
						} else {
							Lo += La;
						}
					}

					for (int i = 0; i < ${pl}; i++) {
						if (pointLightInt[i] <= 0.0)
							continue;

						// calculate per-light radiance
						vec3 L = normalize(pointLightPos[i] - pos);
						vec3 H = normalize(V + L);
						vec3 radiance = pointLightColor[i] * pointLightInt[i];

						// cook-torrance brdf
						float NDF = distributionGGX(N, H, roughness);
						float G   = geometrySmith(N, V, L, roughness);
						vec3 F    = fresnelSchlickRoughness(max(dot(H, V), 0.0), F0, roughness);

						vec3 numerator = NDF * G * F;
						float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.00001;
						vec3 specular = numerator / denominator;

						// kS is equal to Fresnel
						vec3 kD = vec3(1.0) - F;
						kD *= 1.0 - min(metallic, 0.9999);

						// add to outgoing radiance Lo
						float NdotL = max(dot(N, L), 0.0);
						if (map_d >= 0.85 || overlay) {
							Lo += (kD * albedo / PI + specular * map_Ks) * radiance * NdotL * shadow * ao;
						}
						else {
							Lo += (kD * albedo / PI + specular * map_Ks) * radiance * NdotL;
						}

						// ambient lighting
						vec3 La = kD * albedo * (pointLightAmb[i]+0.0001);

						if (map_d >= 0.85 || overlay) {
							// sss
							if (sSSS && sss) {
								vec3 H_d = normalize(L + N * sssDistortion);
								float VdotH = pow(clamp(dot(V, -H_d), 0.0, 1.0), sssPower);
								Lo += (kD * albedo / PI + specular * map_Ks) * (VdotH+sssAmbient) * iao * sssIntensity * NdotL * shadow * ao;
							}

							// ao
							Lo += La * ao;
						} else {
							Lo += La;
						}
					}

					vec3 c = (Lo + Le);


					if (sReinhard) {
						float l_old = 0.2126*c.r+0.7152*c.g+0.0722*c.b;
						float numerator = l_old * (1.0 + (l_old / (whiteM*whiteM)));
						float l_new = numerator / (1.0 + l_old);
						c = c * (l_new / l_old);
					}

					if (sUchimura) {
						c = tonemapUchimura(c, uchimuraP, uchimuraA);
					}

					if (sGamma)
						c = pow(c, vec3(1.0/gammaY));

					if (sNormals)
						c = new_normal*0.5+0.5;

					if (sAO)
						c = vec3(ao);

					if (sIAO)
						c = vec3(iao);

					outputColor = vec4(c*map_d, map_d);
				}`;
	}

	initBuffers(sceneData, sceneParams, dir) {
		// init buffer containers
		this.buffers = new class {};
		this.buffers.models = [];
		for (let m=0; m < sceneData.models.length; m++) {
			this.buffers.models[m] = new class {};
			this.buffers.models[m].tree = this.buildModelTree(sceneParams.models[m]);
		}

		// init quad buffers
		this.buffers.quadPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadPositionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), this.gl.STATIC_DRAW);

		this.buffers.quadTextureBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadTextureBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0, 1, 0, 0, 1, 1, 1, 0]), this.gl.STATIC_DRAW);

		this.buffers.quadIndexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.quadIndexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 3, 2, 1]), this.gl.STATIC_DRAW);

		this.initFrameBuffers(this.buffers, 1200, 1500);

		// init model buffers
		for (let m=0; m < this.buffers.models.length; m++) {
			let modelBuffers = this.buffers.models[m];
			let modelData = sceneData.models[m];

			modelBuffers.verticesPositionBuffer = [];
			modelBuffers.verticesNormalBuffer = [];
			modelBuffers.verticesTextureCoordBuffer = [];

			modelBuffers.vertexPositionBuffer = [];
			modelBuffers.verticesIndexBuffer = [];
			modelBuffers.indexSizes = [];
			modelBuffers.figureIndices = [];
			modelBuffers.figureSeemMaps = [];
			modelBuffers.figureTargets = [];
			modelBuffers.figureWeights = [];
			modelBuffers.figureTarget = [];

			for (let i=0, count=0; i < modelData.figures.length; i++) {
				modelBuffers.verticesPositionBuffer[i] = this.gl.createBuffer();
				modelBuffers.vertexPositionBuffer[i] = this.base64ToFloat(modelData.figures[i].verts);

				modelBuffers.verticesNormalBuffer[i] = this.gl.createBuffer();

				modelBuffers.verticesTextureCoordBuffer[i] = this.gl.createBuffer();
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesTextureCoordBuffer[i]);
				this.gl.bufferData(this.gl.ARRAY_BUFFER, this.base64ToFloat(modelData.figures[i].texts), this.gl.STATIC_DRAW);

				modelBuffers.figureIndices[i] = [];
				for (let j=0; j < modelData.figures[i].surfaces.length; j++, count++) {
					modelBuffers.verticesIndexBuffer[count] = this.gl.createBuffer();
					this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, modelBuffers.verticesIndexBuffer[count]);
					let intArray = this.base64ToInt(modelData.figures[i].surfaces[j].vertsi);
					modelBuffers.figureIndices[i] = [...modelBuffers.figureIndices[i], ...intArray];
					this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, intArray, this.gl.STATIC_DRAW);
					modelBuffers.indexSizes[count] = intArray.length;
				}

				let seems = this.base64ToInt(modelData.figures[i].seems);
				let seemMap = new Int32Array(seems.length*2);
				let indices = modelBuffers.figureIndices[i];
				for (let j=0, h=0; j < seems.length; j+=3, h+=6) {
					let idx = seems[j+1];
					let value = seems[j+2];
					indices[seems[j]] = value/3;
					seemMap[h] = idx;
					seemMap[h+1] = value;
					seemMap[h+2] = idx+1;
					seemMap[h+3] = value+1;
					seemMap[h+4] = idx+2;
					seemMap[h+5] = value+2;
				}
				modelBuffers.figureSeemMaps[i] = seemMap;
				modelBuffers.figureTargets[i] = this.base64ToInt(modelData.figures[i].targets);
				modelBuffers.figureWeights[i] = this.base64ToFloat(modelData.figures[i].weights);
				modelBuffers.figureTarget[i] = parseInt(modelData.figures[i].target);
			}
			this.initMorphs(modelBuffers, modelData, dir);
		}
	}

	updateResolution(screenWidth, screenHeight) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.gPosition);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, screenWidth, screenHeight, 0, this.gl.RGBA, this.gl.FLOAT, null);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.gNormal);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA16F, screenWidth, screenHeight, 0, this.gl.RGBA, this.gl.FLOAT, null);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.gShadowDepth);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32F, screenWidth*4, screenHeight*4, 0, this.gl.RED, this.gl.FLOAT, null);

		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.buffers.shadowFBO);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT32F, screenWidth*4, screenHeight*4);

		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.buffers.rboDepth);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, screenWidth, screenHeight);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.ssaoColorBuffer);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R16F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.ssaoColorBufferBlur);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R16F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.sssColorBuffer);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R16F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.sssColorBufferBlur);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R16F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.guassianColorBuffer);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, screenWidth, screenHeight, 0, this.gl.RGBA, this.gl.FLOAT, null);

		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.buffers.forwardFBO);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT32F, screenWidth, screenHeight);

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	}

	initFrameBuffers(buffers, screenWidth, screenHeight) {
		// configure g-buffer framebuffer
		buffers.gBuffer = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffers.gBuffer);

		// position color buffer
		buffers.gPosition = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.gPosition);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, screenWidth, screenHeight, 0, this.gl.RGBA, this.gl.FLOAT, null);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, buffers.gPosition, 0);
		// normal color buffer
		buffers.gNormal = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.gNormal);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA16F, screenWidth, screenHeight, 0, this.gl.RGBA, this.gl.FLOAT, null);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT1, this.gl.TEXTURE_2D, buffers.gNormal, 0);

		let attachments = [];
		attachments[0] = this.gl.COLOR_ATTACHMENT0;
		attachments[1] = this.gl.COLOR_ATTACHMENT1;
		this.gl.drawBuffers(attachments);

		// create and attach depth buffer
		buffers.rboDepth = this.gl.createRenderbuffer();
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, buffers.rboDepth);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, screenWidth, screenHeight);
		this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, buffers.rboDepth);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		// configure shadow buffer
		buffers.shadowBuffer = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffers.shadowBuffer);

		buffers.gShadowDepth = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.gShadowDepth);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R32F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, buffers.gShadowDepth, 0);

		this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0]);

		buffers.shadowFBO = this.gl.createRenderbuffer();
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, buffers.shadowFBO);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, screenWidth, screenHeight);
		this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, buffers.shadowFBO);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		// SSAO color buffer
		buffers.ssaoColorBuffer = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.ssaoColorBuffer);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R16F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);

		buffers.ssaoFBO = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffers.ssaoFBO);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, buffers.ssaoColorBuffer, 0);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		// SSAO blur buffer
		buffers.ssaoColorBufferBlur = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.ssaoColorBufferBlur);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R16F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);

		buffers.ssaoBlurFBO = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffers.ssaoBlurFBO);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, buffers.ssaoColorBufferBlur, 0);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		// SSS color buffer
		buffers.sssColorBuffer = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.sssColorBuffer);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R16F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);

		buffers.sssFBO = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffers.sssFBO);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, buffers.sssColorBuffer, 0);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		// SSS blur buffer
		buffers.sssColorBufferBlur = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.sssColorBufferBlur);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.R16F, screenWidth, screenHeight, 0, this.gl.RED, this.gl.FLOAT, null);

		buffers.sssBlurFBO = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffers.sssBlurFBO);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, buffers.sssColorBufferBlur, 0);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		// forward color buffer
		buffers.forwardBuffer = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, buffers.forwardBuffer);

		buffers.guassianColorBuffer = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.guassianColorBuffer);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, screenWidth, screenHeight, 0, this.gl.RGBA, this.gl.FLOAT, null);
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, buffers.guassianColorBuffer, 0);

		this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0]);

		buffers.forwardFBO = this.gl.createRenderbuffer();
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, buffers.forwardFBO);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT32F, screenWidth, screenHeight);
		this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, buffers.forwardFBO);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		const random = function(seed) {
			let x = Math.sin(seed+1) * 10000;
			return x - Math.floor(x);
		};

		// generate sample kernel
		this.buffers.ssaoKernel = [];
		for (let i = 0; i < 32; i++) {
			let sample = [random(i+1) * 2.0 - 1.0, random(i+2) * 2.0 - 1.0, random(i+3)];
			sample = this.vectorNormalize(sample);
			sample = this.vectorMul(sample, random(4));
			let scale = i / 32.0;

			// scale samples s.t. they're more aligned to center of kernel
			scale = this.lerp(0.1, 1.0, scale * scale);
			sample = this.vectorMul(sample, scale);
			this.buffers.ssaoKernel.push(sample);
		}

		// generate noise texture
		let ssaoNoise = [];
		for (let i = 0; i < 9; i++) {
			let noise = [random(i+1) * 2.0 - 1.0, random(i+2) * 2.0 - 1.0, 0.0, 1.0];
			ssaoNoise = ssaoNoise.concat(noise);
		}

		buffers.noiseTexture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, buffers.noiseTexture);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA16F, 3, 3, 0, this.gl.RGBA, this.gl.FLOAT, new Float32Array(ssaoNoise));
	}

	initMorphs(modelBuffers, modelData, dir) {
		window.sceneBlocks = {}; // automatically populated during loading of morphs

		let promisedMorphs = [];
		modelBuffers.vertexPositionMorphs = [];
		modelBuffers.vertexIndexMorphs = [];
		for (let f=0; f < modelData.figures.length; f++) {
			modelBuffers.vertexPositionMorphs[f] = [];
			modelBuffers.vertexIndexMorphs[f] = [];
			for (let m=0; m < modelData.morphCount; m++) {
				modelBuffers.vertexPositionMorphs[f].push(new Float32Array(0));
				modelBuffers.vertexIndexMorphs[f].push(new Int32Array(0));
			}

			// stream real morphs
			promisedMorphs[f] = this.loadMorph(modelBuffers, f, modelData.figures[f].morphs, dir);
		}

		Promise.all(promisedMorphs).then((values) => {
			if (values.length > 2) { // promise triggers twice (?)
				if (App.Art.engineReady) { // re-send loaded event after morphs finish streaming
					modelBuffers.oldMorphValues = null;
					let containers = document.getElementsByClassName("artContainer");
					for (let i = 0; i < containers.length; i++) {
						containers[i].dispatchEvent(new Event("engineLoaded"));
					}
				}
			}
		});
	}

	loadMorph(modelBuffers, m, path, dir) {
		let engine = this;
		return new Promise(function(resolve, reject) {
			let script = document.createElement("script");
			script.onload = function() {
				let name = path.split("/").slice(-1)[0];
				let morph = window.sceneBlocks[name];

				for (let i=0; i < morph.length; i+=2) {
					modelBuffers.vertexPositionMorphs[m][i/2] = engine.base64ToFloat(morph[i+0]);
					// reconstruct compressed indices
					modelBuffers.vertexIndexMorphs[m][i/2] = engine.base64ToInt(morph[i+1]).map((sum => value => sum += value)(0));
				}

				window.sceneBlocks[name] = null; // let garbage collector clean
				resolve();
			};
			script.onerror = function(e) {
				reject(e, script);
			};
			script.src = dir + path;
			document.head.appendChild(script);
		});
	}

	initTextures(sceneData, dir) {
		// load model textures
		this.textures = {};
		let promisedTextures = [];
		for (let key in sceneData.textures) {
			let texture = this.gl.createTexture();
			this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
			this.textures[key] = texture;

			promisedTextures.push(this.loadTexture(this.gl, texture, sceneData.textures[key], dir));
		}

		Promise.all(promisedTextures).then(() => {
			if (App.Art.engineReady) { // re-send loaded event after textures finish streaming
				let containers = document.getElementsByClassName("artContainer");
				for (let i = 0; i < containers.length; i++) {
					containers[i].dispatchEvent(new Event("engineLoaded"));
				}
			}
		});
	}

	loadTexture(gl, texture, path, dir) {
		return new Promise(function(resolve, reject) {
			let script = document.createElement("script");
			script.onload = function() {
				let name = path.split("/").slice(-1)[0];
				let url = window.sceneBlocks[name][0];

				let img = document.createElement("img");
				img.onload = function() {
					// resize
					let width = img.width;
					let height = img.height;
					let aspect = parseFloat(height / width);

					let textureSize = 1024;
					if (typeof V.setTextureResolution !== "undefined") {
						textureSize = V.setTextureResolution;
					}
					if (width > textureSize || height > textureSize) {
						if (width > textureSize) {
							width = textureSize;
							height = parseInt(width * aspect);
						}
						if (height > textureSize) {
							height = textureSize;
							width = parseInt(width / aspect);
						}

						let canvas = document.createElement("canvas");
						let ctx = canvas.getContext("2d");
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(img, 0, 0, width, height);
						img = canvas;
					}

					gl.bindTexture(gl.TEXTURE_2D, texture);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

					window.sceneBlocks[name] = null; // let garbage collector clean
					resolve();
				};
				img.src = url;
			};
			script.onerror = function(e) {
				reject(e, script);
			};
			script.src = dir + path;
			document.head.appendChild(script);
		});
	}

	initShaders(sceneParams) {
		// compile shaders
		let vertexShaderGeometry = this.gl.createShader(this.gl.VERTEX_SHADER);
		this.gl.shaderSource(vertexShaderGeometry, this.getVsSourceGeometry());
		this.gl.compileShader(vertexShaderGeometry);

		let fragmentShaderGeometry = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragmentShaderGeometry, this.getFsSourceGeometry());
		this.gl.compileShader(fragmentShaderGeometry);

		let vertexShaderShadow = this.gl.createShader(this.gl.VERTEX_SHADER);
		this.gl.shaderSource(vertexShaderShadow, this.getVsSourceShadow());
		this.gl.compileShader(vertexShaderShadow);

		let fragmentShaderShadow = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragmentShaderShadow, this.getFsSourceShadow());
		this.gl.compileShader(fragmentShaderShadow);

		let vertexShaderQuad = this.gl.createShader(this.gl.VERTEX_SHADER);
		this.gl.shaderSource(vertexShaderQuad, this.getVsSourceQuad());
		this.gl.compileShader(vertexShaderQuad);

		let fragmentShaderSSAO = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragmentShaderSSAO, this.getFsSourceSSAO());
		this.gl.compileShader(fragmentShaderSSAO);

		let fragmentShaderSSAOBlur = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragmentShaderSSAOBlur, this.getFsSourceSSAOBlur());
		this.gl.compileShader(fragmentShaderSSAOBlur);

		let fragmentShaderSSS = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragmentShaderSSS, this.getFsSourceSSS());
		this.gl.compileShader(fragmentShaderSSS);

		let fragmentShaderSSSBlur = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragmentShaderSSSBlur, this.getFsSourceSSSBlur());
		this.gl.compileShader(fragmentShaderSSSBlur);

		let fragmentShaderForwardPass = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragmentShaderForwardPass, this.getFsSourceForwardPass(sceneParams.directionalLights.length, sceneParams.pointLights.length));
		this.gl.compileShader(fragmentShaderForwardPass);

		this.shaderProgramGeometry = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgramGeometry, vertexShaderGeometry);
		this.gl.attachShader(this.shaderProgramGeometry, fragmentShaderGeometry);
		this.gl.linkProgram(this.shaderProgramGeometry);

		this.shaderProgramShadow = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgramShadow, vertexShaderShadow);
		this.gl.attachShader(this.shaderProgramShadow, fragmentShaderShadow);
		this.gl.linkProgram(this.shaderProgramShadow);

		this.shaderProgramSSAO = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgramSSAO, vertexShaderQuad);
		this.gl.attachShader(this.shaderProgramSSAO, fragmentShaderSSAO);
		this.gl.linkProgram(this.shaderProgramSSAO);

		this.shaderProgramSSAOBlur = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgramSSAOBlur, vertexShaderQuad);
		this.gl.attachShader(this.shaderProgramSSAOBlur, fragmentShaderSSAOBlur);
		this.gl.linkProgram(this.shaderProgramSSAOBlur);

		this.shaderProgramSSS = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgramSSS, vertexShaderQuad);
		this.gl.attachShader(this.shaderProgramSSS, fragmentShaderSSS);
		this.gl.linkProgram(this.shaderProgramSSS);

		this.shaderProgramSSSBlur = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgramSSSBlur, vertexShaderQuad);
		this.gl.attachShader(this.shaderProgramSSSBlur, fragmentShaderSSSBlur);
		this.gl.linkProgram(this.shaderProgramSSSBlur);

		this.shaderProgramForwardPass = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgramForwardPass, vertexShaderGeometry);
		this.gl.attachShader(this.shaderProgramForwardPass, fragmentShaderForwardPass);
		this.gl.linkProgram(this.shaderProgramForwardPass);

		// enable vertex attributes

		this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgramGeometry, "vertexPosition");
		this.gl.enableVertexAttribArray(this.vertexPositionAttribute);

		this.textureCoordAttribute = this.gl.getAttribLocation(this.shaderProgramGeometry, "textureCoordinate");
		this.gl.enableVertexAttribArray(this.textureCoordAttribute);

		this.vertexNormalAttribute = this.gl.getAttribLocation(this.shaderProgramGeometry, "vertexNormal");
		this.gl.enableVertexAttribArray(this.vertexNormalAttribute);

		this.vertexPositionAttribute2 = this.gl.getAttribLocation(this.shaderProgramShadow, "vertexPosition");
		this.gl.enableVertexAttribArray(this.vertexPositionAttribute2);

		this.textureCoordAttribute2 = this.gl.getAttribLocation(this.shaderProgramShadow, "textureCoordinate");
		this.gl.enableVertexAttribArray(this.textureCoordAttribute2);

		this.quadPositionAttribute = this.gl.getAttribLocation(this.shaderProgramSSAO, "vertexPosition");
		this.gl.enableVertexAttribArray(this.quadPositionAttribute);

		this.quadTextureAttribute = this.gl.getAttribLocation(this.shaderProgramSSAO, "textureCoordinate");
		this.gl.enableVertexAttribArray(this.quadTextureAttribute);

		this.quadPositionAttribute3 = this.gl.getAttribLocation(this.shaderProgramSSS, "vertexPosition");
		this.gl.enableVertexAttribArray(this.quadPositionAttribute3);

		this.quadTextureAttribute3 = this.gl.getAttribLocation(this.shaderProgramSSS, "textureCoordinate");
		this.gl.enableVertexAttribArray(this.quadTextureAttribute3);
	}

	bind(sceneData, sceneParams, dir) {
		this.offscreenCanvas = document.createElement("canvas");
		this.gl = this.offscreenCanvas.getContext("webgl2", {alpha:true, premultipliedAlpha: true});
		this.gl.getExtension('EXT_color_buffer_float');

		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthMask(true);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

		this.initBuffers(sceneData, sceneParams, dir);
		this.initTextures(sceneData, dir);
		this.initShaders(sceneParams);
	}

	render(sceneParams, canvas) {
		// update logic
		this.update(sceneParams);

		this.gl.clearColor(0, 0, 0, 0);

		// draw scene
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.disable(this.gl.BLEND);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffers.gBuffer);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.useProgram(this.shaderProgramGeometry);
		this.drawGeometry(sceneParams);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		this.gl.enable(this.gl.BLEND);

		if (V.setShadowMapping) {
			this.gl.disable(this.gl.CULL_FACE);
			this.gl.disable(this.gl.BLEND);
			this.gl.cullFace(this.gl.FRONT);
			this.gl.viewport(0, 0, sceneParams.settings.rwidth*4, sceneParams.settings.rheight*4);
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffers.shadowBuffer);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
			this.gl.useProgram(this.shaderProgramShadow);
			this.drawShadow(sceneParams);
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
			this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
			this.gl.cullFace(this.gl.BACK);
			this.gl.enable(this.gl.BLEND);
		}

		if (V.setSSAO) {
			this.gl.enable(this.gl.CULL_FACE);
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffers.ssaoFBO);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			this.gl.useProgram(this.shaderProgramSSAO);
			this.drawSSAO(sceneParams);
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffers.ssaoBlurFBO);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			this.gl.useProgram(this.shaderProgramSSAOBlur);
			this.drawSSAOBlur(sceneParams);
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		}

		if (V.setSSS) {
			this.gl.enable(this.gl.CULL_FACE);
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffers.sssFBO);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			this.gl.useProgram(this.shaderProgramSSS);
			this.drawSSS(sceneParams);
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffers.sssBlurFBO);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			this.gl.useProgram(this.shaderProgramSSSBlur);
			this.drawSSSBlur(sceneParams);
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		}

		// this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffers.forwardBuffer);
		if (V.setFaceCulling) {
			this.gl.enable(this.gl.CULL_FACE);
		} else {
			this.gl.disable(this.gl.CULL_FACE);
		}
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.useProgram(this.shaderProgramForwardPass);
		this.drawForwardPass(sceneParams, true);

		this.gl.enable(this.gl.CULL_FACE);
		this.gl.useProgram(this.shaderProgramForwardPass);
		this.drawForwardPass(sceneParams, false);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

		// clone from offscreen to real canvas
		let ctx = canvas.getContext('2d', {alpha:true});
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(this.gl.canvas, 0, 0, canvas.width, canvas.height);
	}

	update(sceneParams) {
		// set render resolution
		this.offscreenCanvas.width = sceneParams.settings.rwidth;
		this.offscreenCanvas.height = sceneParams.settings.rheight;
		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
		this.updateResolution(sceneParams.settings.rwidth, sceneParams.settings.rheight);

		// create camera
		let camRotX = this.degreeToRad(-sceneParams.camera.xr);
		let camRotY = this.degreeToRad(-sceneParams.camera.yr);
		let camRotZ = this.degreeToRad(sceneParams.camera.zr);

		let up = [Math.sin(camRotZ), Math.cos(camRotZ), Math.sin(camRotZ)];
		let camera = [sceneParams.camera.x, sceneParams.camera.y, sceneParams.camera.z];

		let matCameraRot = this.matrixMulMatrix(this.matrixMakeRotationX(camRotX), this.matrixMakeRotationY(camRotY));
		let lookDir = this.matrixMulVector(matCameraRot, [0, 0, 1]);
		let target = this.vectorAdd(lookDir, camera);
		let matCamera = this.matrixPointAt(camera, target, up);

		// shadows
		let shadow = [sceneParams.shadows.x, sceneParams.shadows.y, sceneParams.shadows.z];
		let shadowRotX = this.degreeToRad(-sceneParams.shadows.xr);
		let shadowRotY = this.degreeToRad(-sceneParams.shadows.yr);
		let matShadowRot = this.matrixMulMatrix(this.matrixMakeRotationX(shadowRotX), this.matrixMakeRotationY(shadowRotY));
		let shadowDir = this.matrixMulVector(matShadowRot, [0, 0, 1]);
		let shadowTarget = this.vectorAdd(shadowDir, shadow);
		let matShadow = this.matrixPointAt(shadow, shadowTarget, up);

		// create scene transforms
		let matProj = this.matrixMakeProjection(sceneParams.camera.fov, sceneParams.settings.rwidth/sceneParams.settings.rheight, sceneParams.camera.fnear, sceneParams.camera.ffar);
		let matView = this.matrixInverse(matCamera);

		let matShadowProj = this.matrixMakeProjection(sceneParams.shadows.fov, sceneParams.settings.rwidth/sceneParams.settings.rheight, sceneParams.shadows.fnear, sceneParams.shadows.ffar);
		let matShadowView = this.matrixInverse(matShadow);

		this.buffers.matProj = matProj;
		this.buffers.shadowDir = shadowDir;

		for (let m=0; m < this.buffers.models.length; m++) {
			let modelBuffers = this.buffers.models[m];
			let modelParams = sceneParams.models[m];

			if (!modelParams.visible) {
				continue;
			}

			// create model transforms
			this.applyMorphs(sceneParams, modelParams, modelBuffers);

			let matRot = this.matrixMakeRotation(this.degreeToRad(modelParams.transform.xr), this.degreeToRad(modelParams.transform.yr), this.degreeToRad(modelParams.transform.zr));
			let matTrans = this.matrixMakeTranslation(modelParams.transform.x, modelParams.transform.y, modelParams.transform.z);
			let matScale = this.matrixMakeScaling( modelParams.transform.scale);
			let matModel = this.matrixMulMatrix4(matScale, this.matrixMulMatrix4(matTrans, matRot));
			let matModelView = this.matrixMulMatrix4(matModel, matView);
			let matModelViewProjection = this.matrixMulMatrix4(matModelView, matProj);
			let matNormal = this.matrixTranspose(this.matrixInverse(matModelView));
			let matModelViewShadow = this.matrixMulMatrix4(matModel, matShadowView);
			let matModelViewProjectionShadow = this.matrixMulMatrix4(matModelViewShadow, matShadowProj);

			modelBuffers.matModel = matModel;
			modelBuffers.matModelView = matModelView;
			modelBuffers.matModelViewProjection = matModelViewProjection;
			modelBuffers.matNormal = matNormal;
			modelBuffers.matModelViewProjectionShadow = matModelViewProjectionShadow;
		}
	}

	drawGeometry(sceneParams) {
		// process each model in the scene
		for (let m=0; m < this.buffers.models.length; m++) {
			let modelBuffers = this.buffers.models[m];
			let modelParams = sceneParams.models[m];

			if (!modelParams.visible) {
				continue;
			}

			// set model uniform
			this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramGeometry, "matModelViewProjection"), false, new Float32Array(this.matrixFlatten(modelBuffers.matModelViewProjection)));
			this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramGeometry, "matModelView"), false, new Float32Array(this.matrixFlatten(modelBuffers.matModelView)));
			this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramGeometry, "matNormal"), false, new Float32Array(this.matrixFlatten(modelBuffers.matNormal)));

			for (let i=0, count=0; i < modelParams.figures.length; i++) {
				if (!modelParams.figures[i].visible) {
					count += modelParams.figures[i].surfaces.length;
					continue;
				}

				// bind vertex buffers per figure
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesPositionBuffer[i]);
				this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesTextureCoordBuffer[i]);
				this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesNormalBuffer[i]);
				this.gl.vertexAttribPointer(this.vertexNormalAttribute, 3, this.gl.FLOAT, false, 0, 0);

				// bind materials per surface and set uniforms
				for (let j=0; j < modelParams.figures[i].surfaces.length; j++, count++) {
					if (!modelParams.figures[i].surfaces[j].visible) {
						continue;
					}

					for (let h=0; h < 1; h++) { // skip overlays
						let matId = modelParams.figures[i].surfaces[j].matIds[h];
						let matIdx = sceneParams.materials.map(e => e.matId).indexOf(matId);
						if (matIdx === -1) {
							continue;
						}

						let mat = sceneParams.materials[matIdx];

						this.gl.activeTexture(this.gl.TEXTURE0);
						this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_D]);
						this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramGeometry, "alpha"), 0);
						this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramGeometry, "d"), mat.d);

						this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, modelBuffers.verticesIndexBuffer[count]);
						this.gl.drawElements(this.gl.TRIANGLES, modelBuffers.indexSizes[count], this.gl.UNSIGNED_INT, 0);
					}
				}
			}
		}
	}

	drawShadow(sceneParams) {
		// process each model in the scene
		for (let m=0; m < this.buffers.models.length; m++) {
			let modelBuffers = this.buffers.models[m];
			let modelParams = sceneParams.models[m];

			if (!modelParams.visible) {
				continue;
			}

			// set model uniform
			this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramShadow, "matModelViewProjectionShadow"), false, new Float32Array(this.matrixFlatten(modelBuffers.matModelViewProjectionShadow)));

			for (let i=0, count=0; i < modelParams.figures.length; i++) {
				if (!modelParams.figures[i].visible) {
					count += modelParams.figures[i].surfaces.length;
					continue;
				}

				// bind vertex buffers per figure
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesPositionBuffer[i]);
				this.gl.vertexAttribPointer(this.vertexPositionAttribute2, 3, this.gl.FLOAT, false, 0, 0);

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesTextureCoordBuffer[i]);
				this.gl.vertexAttribPointer(this.textureCoordAttribute2, 2, this.gl.FLOAT, false, 0, 0);

				// bind materials per surface and set uniforms
				for (let j=0; j < modelParams.figures[i].surfaces.length; j++, count++) {
					if (!modelParams.figures[i].surfaces[j].visible) {
						continue;
					}

					for (let h=0; h < 1; h++) { // skip overlays
						let matId = modelParams.figures[i].surfaces[j].matIds[h];
						let matIdx = sceneParams.materials.map(e => e.matId).indexOf(matId);
						if (matIdx === -1) {
							continue;
						}
						let mat = sceneParams.materials[matIdx];

						this.gl.activeTexture(this.gl.TEXTURE0);
						this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_D]);
						this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramShadow, "alpha"), 0);
						this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramShadow, "d"), mat.d);

						this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, modelBuffers.verticesIndexBuffer[count]);
						this.gl.drawElements(this.gl.TRIANGLES, modelBuffers.indexSizes[count], this.gl.UNSIGNED_INT, 0);
					}
				}
			}
		}
	}

	drawSSAO(sceneParams) {
		this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramSSAO, "projection"), false, new Float32Array(this.matrixFlatten(this.buffers.matProj)));

		for (let i = 0; i < 32; ++i) {
			this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramSSAO, "samples[" + i + "]"), this.buffers.ssaoKernel[i]);
		}

		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramSSAO, "radius"), sceneParams.ssao.radius);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramSSAO, "bias"), sceneParams.ssao.bias);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramSSAO, "scale"), sceneParams.ssao.scale);

		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.gPosition);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramSSAO, "gPosition"), 0);

		this.gl.activeTexture(this.gl.TEXTURE1);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.gNormal);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramSSAO, "gNormal"), 1);

		this.gl.activeTexture(this.gl.TEXTURE2);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.noiseTexture);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramSSAO, "texNoise"), 2);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadPositionBuffer);
		this.gl.vertexAttribPointer(this.quadPositionAttribute, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadTextureBuffer);
		this.gl.vertexAttribPointer(this.quadTextureAttribute, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.quadIndexBuffer);
		this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
	}

	drawSSAOBlur(sceneParams) {
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.ssaoColorBuffer);

		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramSSAOBlur, "blur"), sceneParams.ssao.blur);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadPositionBuffer);
		this.gl.vertexAttribPointer(this.quadPositionAttribute, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadTextureBuffer);
		this.gl.vertexAttribPointer(this.quadTextureAttribute, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.quadIndexBuffer);
		this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
	}

	drawSSS(sceneParams) {
		this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramSSS, "projection"), false, new Float32Array(this.matrixFlatten(this.buffers.matProj)));

		for (let i = 0; i < 32; ++i) {
			this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramSSS, "samples[" + i + "]"), this.buffers.ssaoKernel[i]);
		}

		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramSSS, "radius"), sceneParams.sss.radius);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramSSS, "bias"), sceneParams.sss.bias);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramSSS, "scale"), sceneParams.sss.scale);

		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.gPosition);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramSSS, "gPosition"), 0);

		this.gl.activeTexture(this.gl.TEXTURE1);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.gNormal);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramSSS, "gNormal"), 1);

		this.gl.activeTexture(this.gl.TEXTURE2);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.noiseTexture);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramSSS, "texNoise"), 2);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadPositionBuffer);
		this.gl.vertexAttribPointer(this.quadPositionAttribute3, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadTextureBuffer);
		this.gl.vertexAttribPointer(this.quadTextureAttribute3, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.quadIndexBuffer);
		this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
	}

	drawSSSBlur(sceneParams) {
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.sssColorBuffer);

		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramSSSBlur, "blur"), sceneParams.sss.blur);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadPositionBuffer);
		this.gl.vertexAttribPointer(this.quadPositionAttribute3, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.quadTextureBuffer);
		this.gl.vertexAttribPointer(this.quadTextureAttribute3, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.quadIndexBuffer);
		this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
	}

	drawForwardPass(sceneParams, opaque) {
		// set scene uniforms
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "opaque"), opaque);

		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sNormals"), sceneParams.settings.normals);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sAO"), sceneParams.settings.ao);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sIAO"), sceneParams.settings.iao);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sSSAO"), V.setSSAO);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sSSS"), sceneParams.settings.sss);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sShadows"), V.setShadowMapping);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sAlbedo"), sceneParams.settings.albedo);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sSpecular"), sceneParams.settings.specular);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sEmission"), sceneParams.settings.emission);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sNormal"), sceneParams.settings.normal);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sAlpha"), sceneParams.settings.alpha);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sReinhard"), sceneParams.settings.reinhard);
		this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sGamma"), sceneParams.settings.gamma);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "whiteM"), sceneParams.settings.whiteM);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "gammaY"), sceneParams.settings.gammaY);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sUchimura"), sceneParams.settings.uchimura);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "uchimuraP"), sceneParams.settings.uchimuraP);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "uchimuraA"), sceneParams.settings.uchimuraA);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "roughness"), sceneParams.pbr.roughness);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "metallic"), sceneParams.pbr.metallic);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "fresnel"), sceneParams.pbr.fresnel);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "ssaoInt"), sceneParams.ssao.intensity);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sssPower"), sceneParams.sss.power);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sssDistortion"), sceneParams.sss.distortion);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sssIntensity"), sceneParams.sss.intensity);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sssAmbient"), sceneParams.sss.ambient);

		for (let i = 0; i < sceneParams.directionalLights.length; i++) {
			let lightVect = this.polarToCart(this.degreeToRad(sceneParams.directionalLights[i].yr), this.degreeToRad(sceneParams.directionalLights[i].xr));
			this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "lightInt[" + i + "]"), sceneParams.directionalLights[i].intensity);
			this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "lightAmb[" + i + "]"), sceneParams.directionalLights[i].ambient);
			this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "lightColor[" + i + "]"), sceneParams.directionalLights[i].color);
			this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "lightVect[" + i + "]"), lightVect);
		}

		for (let i = 0; i < sceneParams.pointLights.length; i++) {
			this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "pointLightInt[" + i + "]"), sceneParams.pointLights[i].intensity);
			this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "pointLightAmb[" + i + "]"), sceneParams.pointLights[i].ambient);
			this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "pointLightColor[" + i + "]"), sceneParams.pointLights[i].color);
			this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "pointLightPos[" + i + "]"), [sceneParams.pointLights[i].x, sceneParams.pointLights[i].y, sceneParams.pointLights[i].z]);
		}

		this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "shadowDir"), this.buffers.shadowDir);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "shadowBiasMin"), sceneParams.shadows.biasMin);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "shadowBiasMax"), sceneParams.shadows.biasMax);
		this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "shadowIntensity"), sceneParams.shadows.intensity);

		this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "cameraPos"), [sceneParams.camera.x, sceneParams.camera.y, sceneParams.camera.z]);

		// process each model in the scene
		for (let m=0; m < this.buffers.models.length; m++) {
			let modelBuffers = this.buffers.models[m];
			let modelParams = sceneParams.models[m];

			if (!modelParams.visible) {
				continue;
			}

			// set model uniform
			this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "matModelViewProjection"), false, new Float32Array(this.matrixFlatten(modelBuffers.matModelViewProjection)));
			this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "matModelView"), false, new Float32Array(this.matrixFlatten(modelBuffers.matModelView)));
			this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "matNormal"), false, new Float32Array(this.matrixFlatten(modelBuffers.matNormal)));
			this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "matModelViewProjectionShadow"), false, new Float32Array(this.matrixFlatten(modelBuffers.matModelViewProjectionShadow)));

			for (let i=0, count=0; i < modelParams.figures.length; i++) {
				if (!modelParams.figures[i].visible) {
					count += modelParams.figures[i].surfaces.length;
					continue;
				}

				// bind vertex buffers per figure
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesPositionBuffer[i]);
				this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesTextureCoordBuffer[i]);
				this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesNormalBuffer[i]);
				this.gl.vertexAttribPointer(this.vertexNormalAttribute, 3, this.gl.FLOAT, false, 0, 0);

				// bind materials per surface and set uniforms
				for (let j=0; j < modelParams.figures[i].surfaces.length; j++, count++) {
					if (!modelParams.figures[i].surfaces[j].visible) {
						continue;
					}

					for (let h=0; h < modelParams.figures[i].surfaces[j].matIds.length; h++) {
						let matId = modelParams.figures[i].surfaces[j].matIds[h];
						let matIdx = sceneParams.materials.map(e => e.matId).indexOf(matId);
						if (matIdx === -1) {
							continue;
						}
						let mat = sceneParams.materials[matIdx];

						if (matId !== "ao_surface") {
							if (h > 0) {
								this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "overlay"), 1);
							} else {
								this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "overlay"), 0);
							}

							this.gl.activeTexture(this.gl.TEXTURE0);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.ssaoColorBufferBlur);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[0]"), 0);

							this.gl.activeTexture(this.gl.TEXTURE1);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_D]);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[1]"), 1);

							this.gl.activeTexture(this.gl.TEXTURE2);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_Ka]);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[2]"), 2);

							this.gl.activeTexture(this.gl.TEXTURE3);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_Ks]);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[3]"), 3);

							this.gl.activeTexture(this.gl.TEXTURE4);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_Ke]);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[4]"), 4);

							this.gl.activeTexture(this.gl.TEXTURE5);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_Kn]);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[5]"), 5);

							this.gl.activeTexture(this.gl.TEXTURE6);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_Kr]);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[6]"), 6);

							this.gl.activeTexture(this.gl.TEXTURE7);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[mat.map_Km]);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[7]"), 7);

							this.gl.activeTexture(this.gl.TEXTURE8);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.gShadowDepth);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[8]"), 8);

							this.gl.activeTexture(this.gl.TEXTURE9);
							this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffers.sssColorBufferBlur);
							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "textSampler[9]"), 9);

							this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "d"), mat.d);
							this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "Ka"), mat.Ka);
							this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "Ks"), mat.Ks);
							this.gl.uniform3fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "Ke"), mat.Ke);
							this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "Ni"), this.ior2f0(mat.Ni) * sceneParams.pbr.fresnel);
							this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "r"), mat.r * sceneParams.pbr.roughness);
							this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "m"), mat.m * sceneParams.pbr.metallic);

							this.gl.uniform2fv(this.gl.getUniformLocation(this.shaderProgramForwardPass, "offset"), [mat.transform[0], mat.transform[1]]);
							this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "angle"), mat.transform[2]);
							this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgramForwardPass, "scale"), mat.transform[3]);

							this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgramForwardPass, "sss"), mat.sss);

							// draw materials
							this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, modelBuffers.verticesIndexBuffer[count]);
							this.gl.drawElements(this.gl.TRIANGLES, modelBuffers.indexSizes[count], this.gl.UNSIGNED_INT, 0);
						}
					}
				}
			}
		}
	}

	traverseTree(tree, current, callback) {
		let children = tree[current];
		let isRoot = tree.roots.includes(current);

		if (children !== undefined) {
			callback.call(this, current, isRoot, false);
			children.forEach(child => this.traverseTree(tree, child, callback));
		} else {
			callback.call(this, current, isRoot, true);
		}
	}

	buildModelTree(modelParams) {
		let tree = {};
		tree.roots = [];

		for (let i = 0; i < modelParams.figures.length; i++) {
			let parent = modelParams.figures[i].morphTarget;

			if (parent === '') {
				tree.roots.push(i);
				continue;
			}

			parent = modelParams.figures.findIndex(x => x.figId === parent);
			if (tree[parent] === undefined)  {
				tree[parent] = [];
			}
			tree[parent].push(i);
		}
		return tree;
	}

	makeCheckString(sceneParams, modelParams) {
		let checkString = '';
		modelParams.morphs.forEach(m => checkString += m.value + '' + m.offset);
		modelParams.figures.forEach(f => checkString += f.visible);
		checkString += sceneParams.settings.morphOffsetA + '' + sceneParams.settings.morphOffsetB + '' + sceneParams.settings.morphOffsetM;
		return checkString;
	}

	applyMorphs(sceneParams, modelParams, modelBuffers) {
		if (modelParams.visible && modelBuffers.oldMorphValues !== this.makeCheckString(sceneParams, modelParams)) {
			modelBuffers.tree.roots.forEach(root => this.traverseTree(modelBuffers.tree, root, function(f, isRoot, isLeaf) {
				// check if children are visible
				let visible = false;
				this.traverseTree(modelBuffers.tree, f, function(f2, isRoot, isLeaf) {
					if (modelParams.figures[f2].visible) {
						visible = true;
					}
				});

				if (!visible) {
					return;
				}

				let vertexPosition = new Float32Array(modelBuffers.vertexPositionBuffer[f]);
				let vertexNormal = new Float32Array(vertexPosition.length);

				// apply morph
				for (let m=0; m < modelParams.morphs.length; m++) {
					let morphValue = modelParams.morphs[m].value;
					if (modelParams.figures[f].morphOffset) {
						morphValue *= modelParams.morphs[m].offset;
					}

					if (morphValue !== 0) {
						let vp = modelBuffers.vertexPositionMorphs[f][m];
						let vi = modelBuffers.vertexIndexMorphs[f][m];

						if (morphValue === 1) {
							for (let j = 0; j < vi.length; j++) {
								vertexPosition[vi[j]] += vp[j];
							}
						} else {
							for (let j=0; j < vi.length; j++) {
								vertexPosition[vi[j]] += vp[j] * morphValue;
							}
						}
					}
				}

				// get morph delta
				if (!isLeaf) {
					let pDelta = new Float32Array(vertexPosition);
					let vp = new Float32Array(modelBuffers.vertexPositionBuffer[f]);
					for (let j=0; j < vp.length; j+=3) {
						pDelta[j]   -= vp[j];
						pDelta[j+1] -= vp[j+1];
						pDelta[j+2] -= vp[j+2];
					}
					modelBuffers.posDelta = pDelta; // save morph delta
				}

				if (!isRoot) {
					let targets = modelBuffers.figureTargets[f];
					let weights = modelBuffers.figureWeights[f];
					let target = modelBuffers.figureTarget[f];
					let pDelta = modelBuffers.posDelta;
					let nDelta = modelBuffers.normDelta;
					let mA = sceneParams.settings.morphOffsetA;
					let mB = sceneParams.settings.morphOffsetB;
					let mM = sceneParams.settings.morphOffsetM;

					if (modelParams.figures[f].morphFollow) {
						for (let j = 0; j < vertexPosition.length; j+=3) {
							let t1 = targets[j]; // get closest triangle to base mesh
							let t2 = targets[j+1];
							let t3 = targets[j+2];

							let w1 = weights[j];
							let w2 = weights[j+1];
							let w3 = weights[j+2];

							// find precomputed baricentric point
							let p1 = pDelta[t1]*w1 + pDelta[t2]*w2 + pDelta[t3]*w3;
							let p2 = pDelta[t1+1]*w1 + pDelta[t2+1]*w2 + pDelta[t3+1]*w3;
							let p3 = pDelta[t1+2]*w1 + pDelta[t2+2]*w2 + pDelta[t3+2]*w3;

							vertexPosition[j]   += p1;
							vertexPosition[j+1] += p2;
							vertexPosition[j+2] += p3;

							let n1 = nDelta[t1]*w1 + nDelta[t2]*w2 + nDelta[t3]*w3;
							let n2 = nDelta[t1+1]*w1 + nDelta[t2+1]*w2 + nDelta[t3+1]*w3;
							let n3 = nDelta[t1+2]*w1 + nDelta[t2+2]*w2 + nDelta[t3+2]*w3;

							let l = this.vectorLength([p1, p2, p3]);
							if (l > 0.01) { // apply morph delta and add offset according to base mesh normals
								l = Math.min(l / mA, mM) * mB;
								vertexPosition[j]   += l*n1;
								vertexPosition[j+1] += l*n2;
								vertexPosition[j+2] += l*n3;
							}
						}
					} else { // static morph, follow one vertex
						let t1 = targets[target];
						let t2 = targets[target+1];
						let t3 = targets[target+2];

						let w1 = weights[target];
						let w2 = weights[target+1];
						let w3 = weights[target+2];

						// find precomputed baricentric point
						let p1 = pDelta[t1]*w1 + pDelta[t2]*w2 + pDelta[t3]*w3;
						let p2 = pDelta[t1+1]*w1 + pDelta[t2+1]*w2 + pDelta[t3+1]*w3;
						let p3 = pDelta[t1+2]*w1 + pDelta[t2+2]*w2 + pDelta[t3+2]*w3;

						for (let j = 0; j < vertexPosition.length; j+=3) {
							vertexPosition[j]   += p1;
							vertexPosition[j+1] += p2;
							vertexPosition[j+2] += p3;
						}
					}
				}

				// recalculate normals
				let indices = modelBuffers.figureIndices[f];
				for (let j=0; j < indices.length; j+=3) {
					let idx1 = indices[j]*3;
					let idx2 = indices[j+1]*3;
					let idx3 = indices[j+2]*3;

					let v1 = [vertexPosition[idx1], vertexPosition[idx1+1], vertexPosition[idx1+2]];
					let v2 = [vertexPosition[idx2], vertexPosition[idx2+1], vertexPosition[idx2+2]];
					let v3 = [vertexPosition[idx3], vertexPosition[idx3+1], vertexPosition[idx3+2]];

					let n = this.vectorNormalize(this.vectorCrossProduct(this.vectorSub(v2, v1), this.vectorSub(v1, v3)));
					if (isNaN(n[0])) { // when area of triangle is 0
						continue;
					}

					vertexNormal[idx1] += n[0];
					vertexNormal[idx1+1] += n[1];
					vertexNormal[idx1+2] += n[2];
					vertexNormal[idx2] += n[0];
					vertexNormal[idx2+1] += n[1];
					vertexNormal[idx2+2] += n[2];
					vertexNormal[idx3] += n[0];
					vertexNormal[idx3+1] += n[1];
					vertexNormal[idx3+2] += n[2];
				}

				// fix edge normals
				let seemMap = modelBuffers.figureSeemMaps[f];
				for (let j=0; j < seemMap.length; j+=2) {
					vertexNormal[seemMap[j]] = vertexNormal[seemMap[j+1]];
				}

				if (!isLeaf) {
					for (let j=0; j < vertexNormal.length; j+=3) {
						let l = this.vectorLength([vertexNormal[j], vertexNormal[j+1], vertexNormal[j+2]]);
						vertexNormal[j]   /= l;
						vertexNormal[j+1] /= l;
						vertexNormal[j+2] /= l;
					}
					modelBuffers.normDelta = vertexNormal;
				}

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesPositionBuffer[f]);
				this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexPosition, this.gl.STATIC_DRAW);

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, modelBuffers.verticesNormalBuffer[f]);
				this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexNormal, this.gl.STATIC_DRAW);
			}));
			modelBuffers.oldMorphValues = this.makeCheckString(sceneParams, modelParams);
		}
	}

	base64ToFloat(array) {
		let b = window.atob(this.gzipToBase64(array));
		let fLen = b.length / (Float32Array.BYTES_PER_ELEMENT-1);
		let dView = new DataView(new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT));
		let fAry = new Float32Array(fLen);
		let p = 0;

		for (let j=0; j < fLen; j++){
			p = j * 3;
			dView.setUint8(0, 0); // skip 1 precision byte
			dView.setUint8(1, b.charCodeAt(p));
			dView.setUint8(2, b.charCodeAt(p+1));
			dView.setUint8(3, b.charCodeAt(p+2));
			fAry[j] = dView.getFloat32(0, true);
		}
		return fAry;
	}

	base64ToInt(array) {
		let b = window.atob(this.gzipToBase64(array));
		let fLen = b.length / Int32Array.BYTES_PER_ELEMENT;
		let dView = new DataView(new ArrayBuffer(Int32Array.BYTES_PER_ELEMENT));
		let fAry = new Int32Array(fLen);
		let p = 0;

		for (let j=0; j < fLen; j++){
			p = j * 4;
			dView.setUint8(0, b.charCodeAt(p));
			dView.setUint8(1, b.charCodeAt(p+1));
			dView.setUint8(2, b.charCodeAt(p+2));
			dView.setUint8(3, b.charCodeAt(p+3));
			fAry[j] = dView.getInt32(0, true);
		}
		return fAry;
	}

	gzipToBase64(array) {
		if (array === '') {
			return array;
		}

		let b = window.atob(array);
		let fLen = b.length / Uint8Array.BYTES_PER_ELEMENT;
		let dView = new DataView(new ArrayBuffer(Uint8Array.BYTES_PER_ELEMENT));
		let fAry = new Uint8Array(fLen);

		for (let j=0; j < fLen; j++){
			dView.setUint8(0, b.charCodeAt(j));
			fAry[j] = dView.getUint8(0);
		}

		let data = pako.ungzip(fAry, {raw:false, "to":"string"});
		return data;
	}

	degreeToRad(d) { return d * (Math.PI / 180); }

	polarToCart(y, p) { return [Math.sin(p) * Math.cos(y), Math.sin(p) * Math.sin(y), Math.cos(p)]; }

	vectorAdd(v1, v2) { return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]; }

	vectorSub(v1, v2) { return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]]; }

	vectorMul(v, k) { return [v[0] * k, v[1] * k, v[2] * k]; }

	vectorDotProduct(v1, v2) { return [v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]]; }

	vectorCrossProduct(v1, v2) { return [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]]; }

	vectorNormalize(v) {
		let l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
		return [v[0]/l, v[1]/l, v[2]/l];
	}

	vectorLength(v) {
		let l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
		return l;
	}

	matrixMakeProjection(fov, aspect, near, far) {
		return [[1/(aspect*Math.tan(fov*0.5/180*Math.PI)), 0, 0, 0],
			[0, (1/Math.tan(fov*0.5/180*Math.PI)), 0, 0],
			[0, 0, far/(far-near), 1],
			[0, 0, (-far*near)/(far-near), 0]];
	}

	matrixMakeOrthoProjection(width, height, near, far) {
		return [[2/width, 0, 0, 0],
			[0, 2/height, 0, 0],
			[0, 0, 1/(far-near), 0],
			[0, 0, -near/(far-near), 1]];
	}

	matrixPointAt(pos, target, up) {
		let newForward = this.vectorNormalize(this.vectorSub(target, pos));
		let a = this.vectorMul(newForward, this.vectorDotProduct(up, newForward));
		let newUp = this.vectorNormalize(this.vectorSub(up, a));
		let newRight = this.vectorCrossProduct(newUp, newForward);

		return [[newRight[0], newRight[1], newRight[2], 0],
			[newUp[0], newUp[1], newUp[2], 0],
			[newForward[0], newForward[1], newForward[2], 0],
			[pos[0], pos[1], pos[2], 1]];
	}

	matrixMakeRotation(xr, yr, zr) {
		let cosA = Math.cos(xr);
		let cosB = Math.cos(yr);
		let cosC = Math.cos(zr);
		let sinA = Math.sin(xr);
		let sinB = Math.sin(yr);
		let sinC = Math.sin(zr);

		return ([[cosB*cosC, -cosB*sinC, sinB, 0],
			[sinA*sinB*cosC+cosA*sinC, -sinA*sinB*sinC+cosA*cosC, -sinA*cosB, 0],
			[-cosA*sinB*cosC+sinA*sinC, cosA*sinB*sinC+sinA*cosC, cosA*cosB, 0],
			[0, 0, 0, 1]]);
	}

	matrixMakeRotationX(r) {
		return [[1, 0, 0],
			[0, Math.cos(r), Math.sin(r)],
			[0, -Math.sin(r), Math.cos(r)]];
	}

	matrixMakeRotationY(r) {
		return [[Math.cos(r), 0, Math.sin(r)],
			[0, 1, 0],
			[-Math.sin(r), 0, Math.cos(r)]];
	}

	matrixMakeRotationZ(r) {
		return [[Math.cos(r), Math.sin(r), 0],
			[-Math.sin(r), Math.cos(r), 0],
			[0, 0, 1]];
	}

	matrixMakeTranslation(x, y, z) {
		return [[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[x, y, z, 1]];
	}

	matrixMakeScaling(s) {
		return [[s, 0, 0, 0],
			[0, s, 0, 0],
			[0, 0, s, 0],
			[0, 0, 0, 1]];
	}

	matrixMulMatrix(m1, m2) {
		return [[m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0],
			m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][1],
			m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2]],
		[m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][0],
			m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1],
			m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2]],
		[m1[2][0] * m2[0][0] + m1[2][1] * m2[1][0] + m1[2][2] * m2[2][0],
			m1[2][0] * m2[0][1] + m1[2][1] * m2[1][1] + m1[2][2] * m2[2][1],
			m1[2][0] * m2[0][2] + m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2]]];
	}

	matrixMulMatrix4(m1, m2) {
		return [[m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0] + m1[0][3] * m2[3][0],
			m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][1] + m1[0][3] * m2[3][1],
			m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2] + m1[0][3] * m2[3][2],
			m1[0][0] * m2[0][3] + m1[0][1] * m2[1][3] + m1[0][2] * m2[2][3] + m1[0][3] * m2[3][3]],
		[m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][0] + m1[1][3] * m2[3][0],
			m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1] + m1[1][3] * m2[3][1],
			m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2] + m1[1][3] * m2[3][2],
			m1[1][0] * m2[0][3] + m1[1][1] * m2[1][3] + m1[1][2] * m2[2][3] + m1[1][3] * m2[3][3]],
		[m1[2][0] * m2[0][0] + m1[2][1] * m2[1][0] + m1[2][2] * m2[2][0] + m1[2][3] * m2[3][0],
			m1[2][0] * m2[0][1] + m1[2][1] * m2[1][1] + m1[2][2] * m2[2][1] + m1[2][3] * m2[3][1],
			m1[2][0] * m2[0][2] + m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2] + m1[2][3] * m2[3][2],
			m1[2][0] * m2[0][3] + m1[2][1] * m2[1][3] + m1[2][2] * m2[2][3] + m1[2][3] * m2[3][3]],
		[m1[3][0] * m2[0][0] + m1[3][1] * m2[1][0] + m1[3][2] * m2[2][0] + m1[3][3] * m2[3][0],
			m1[3][0] * m2[0][1] + m1[3][1] * m2[1][1] + m1[3][2] * m2[2][1] + m1[3][3] * m2[3][1],
			m1[3][0] * m2[0][2] + m1[3][1] * m2[1][2] + m1[3][2] * m2[2][2] + m1[3][3] * m2[3][2],
			m1[3][0] * m2[0][3] + m1[3][1] * m2[1][3] + m1[3][2] * m2[2][3] + m1[3][3] * m2[3][3]]];
	}

	matrixMulVector(m, v) {
		return [v[0] * m[0][0] + v[1] * m[1][0] + v[2] * m[2][0],
			v[0] * m[0][1] + v[1] * m[1][1] + v[2] * m[2][1],
			v[0] * m[0][2] + v[1] * m[1][2] + v[2] * m[2][2]];
	}

	matrixInverse(m) {
		return [[m[0][0], m[1][0], m[2][0], 0],
			[m[0][1], m[1][1], m[2][1], 0],
			[m[0][2], m[1][2], m[2][2], 0],
			[-(m[3][0]*m[0][0]+m[3][1]*m[0][1]+m[3][2]*m[0][2]), -(m[3][0]*m[1][0]+m[3][1]*m[1][1]+m[3][2]*m[1][2]), -(m[3][0]*m[2][0]+m[3][1]*m[2][1]+m[3][2]*m[2][2]), 1]];
	}

	matrixTranspose(m) {
		return [[m[0][0], m[1][0], m[2][0], m[3][0]],
			[m[0][1], m[1][1], m[2][1], m[3][1]],
			[m[0][2], m[1][2], m[2][2], m[3][2]],
			[m[0][3], m[1][3], m[2][3], m[3][3]]];
	}

	matrixFlatten(m) {
		return [m[0][0], m[0][1], m[0][2], m[0][3],
			m[1][0], m[1][1], m[1][2], m[1][3],
			m[2][0], m[2][1], m[2][2], m[2][3],
			m[3][0], m[3][1], m[3][2], m[3][3]];
	}

	lerp(a, b, f) {
		return a + f * (b - a);
	}

	ior2f0(ior) {
		return (ior - 1)**2/(ior + 1)**2;
	}
};
