# SabanaTech · Segundo corte — presentación interactiva

Página web para exponer el segundo corte paso a paso. Es un solo archivo (`index.html`), sin instalación ni dependencias.

**Enlace:** https://santig6p.github.io/sabanatech-corte2/

## Cómo se maneja

| Acción | Qué hace |
|---|---|
| Flecha derecha, `Espacio` o botón **SIGUIENTE** | Siguiente escena |
| Flecha izquierda o botón **ANTERIOR** | Escena anterior |
| Círculos numerados de arriba | Saltar a cualquier escena (la barra de arriba muestra el avance) |
| `Inicio` / `Fin` | Primera / última escena |
| Clic en cualquier elemento | Cada escena tiene algo que se toca; abajo dice qué |

La dirección de la página recuerda la escena (`#7` = escena 7), así que puedes abrir una escena concreta.

**Consejos antes de empezar**
- Ábrela en pantalla completa (`F11`) y prueba el enlace en el computador que vas a usar, con Internet (las tipografías vienen de Google Fonts; sin Internet funciona igual con otra letra).
- Ten GNS3 abierto aparte con el proyecto encendido, por si el profesor pide ver algo en vivo (comandos al final).
- Duración: unos 12–15 minutos si nadie interrumpe. Reparte las escenas entre los tres integrantes.

---

## Guion escena por escena

Las frases entre comillas son una propuesta: dilas con tus palabras. **TOCA** es lo que debes pulsar; **SEÑALA** es lo que debes mostrar con el cursor.

### Escena 1 — Portada (≈ 1 min)
**Qué se ve:** título y la lista de lo que pide el segundo corte; los ítems se marcan solos.
**TOCA:** nada. Deja que se marquen los ocho ítems.
**DI:** «Presentamos el segundo corte del proyecto de SabanaTech. Partimos de la red de Bogotá del primer corte, de unos cincuenta empleados, y la evolucionamos: la segmentamos con VLANs, la enrutamos de forma dinámica con OSPF y le agregamos IPv6 con dual-stack. Todo está implementado y probado en GNS3 con routers VyOS.»
**SEÑALA:** la lista de la derecha: «estos ocho puntos son exactamente lo que pide la diapositiva del segundo corte, y ahora vamos a ver cómo cumplimos cada uno».

### Escena 2 — Segmentación: 8 VLANs (≈ 2 min)
**Qué se ve:** ocho tarjetas de VLAN y una tabla con la justificación.
**TOCA:** la tarjeta **10**, luego la **70**, luego la **80**. Cada una muestra quién la usa, por qué y en qué router está su gateway.
**DI:** «Dividimos en ocho VLANs. La pregunta de la sesión 13 era si invitados, finanzas, gerencia y desarrollo pueden compartir segmento; la respuesta es no. Solo juntamos Management con Finanzas y Recursos Humanos en la VLAN 10, porque son las dos áreas administrativas con las mismas funciones y separarlas gastaría una VLAN y un bloque sin ganar aislamiento real. Desarrollo, Comercial y TI van cada una en su VLAN. Servidores y áreas comunes con impresoras tienen red dedicada porque son recursos compartidos. Y el Wi-Fi se representa con dos VLANs: la corporativa, la 70, y la de invitados, la 80.»
**SEÑALA:** la columna «Decisión» de la tabla. Si preguntan por qué los IDs son esos: «el enunciado no los prescribe; usamos los mismos números que los laboratorios del curso».

### Escena 3 — VLSM sobre 10.10.0.0/24 (≈ 2 min)
**Qué se ve:** una barra a escala del /24 con un bloque por VLAN, una tabla y una calculadora.
**TOCA:** el bloque más grande de la barra (WIFI-CORP), luego uno pequeño (COMERCIAL). Después escribe en la calculadora `10.10.0.98/27` (PC-ADMIN) y cambia el prefijo a `/28` para ver cómo cambia la red.
**DI:** «Usamos VLSM sobre el bloque 10.10.0.0/24, que sale del ejercicio 3 de la sesión 9: el /22 dividido en cuatro sedes, y Bogotá se queda con el primer /24. Ordenamos los grupos de mayor a menor y a cada uno le damos el bloque más pequeño que le cabe. A cada cifra le sumamos el treinta por ciento de crecimiento y una dirección para el gateway. Por ejemplo, Wi-Fi corporativo tiene cuarenta dispositivos; con el treinta por ciento son cincuenta y dos, más el gateway, y por eso necesita un /26 de sesenta y dos hosts. El gateway siempre es el primer host utilizable.»
**SEÑALA:** el bloque gris «libre» del final: «nos sobran veinte direcciones para crecer». Y en la barra, los tres bloques oscuros: «los tres enlaces /30 entre routers».
**Si preguntan:** «¿por qué /30 en los enlaces?» → «porque solo hay dos extremos; un /30 tiene exactamente dos hosts».

### Escena 4 — Topología (≈ 1 min 30 s)
**Qué se ve:** el diagrama con tres routers, dos switches y nueve hosts.
**TOCA:** R-CORE, R-DIST1, ASW-1 y un host (por ejemplo PC-ADMIN). Cada uno muestra su papel y sus direcciones.
**DI:** «La topología tiene tres routers VyOS: un núcleo y dos de distribución; dos switches de acceso y nueve hosts, uno por VLAN y dos en el Wi-Fi corporativo para probar esa VLAN entre switches. Es lo mínimo que cumple "varios dispositivos de capa 3" y "más de un switch", y además el computador tiene 7,8 gigas de RAM, así que no gastamos recursos de más.»
**SEÑALA:** los colores: «cian es enlace enrutado, ámbar es trunk, gris es acceso». Al tocar R-DIST1: «aquí viven los gateways de las VLAN 10, 30, 60 y 80».

### Escena 5 — Switching y trunks (≈ 2 min)
**Qué se ve:** tres tarjetas de trunk, el formato de la trama 802.1Q y la tabla de puertos de acceso.
**TOCA:** T1, T2 y sobre todo **T3**.
**DI:** «Un puerto de acceso pertenece a una sola VLAN y el host ni sabe de 802.1Q. Un trunk lleva varias VLANs por un mismo cable poniéndole a la trama la etiqueta 802.1Q, cuyo VLAN ID tiene doce bits. Tenemos tres trunks: T1 y T2 llevan las cuatro VLANs de cada router de distribución, y T3 une los dos switches para la VLAN 70. ¿Por qué? Porque el Wi-Fi corporativo tiene que cubrir los dos pisos y su gateway está en R-DIST2; así WIFI-CORP-1, que está en el piso de ASW-1, llega a su gateway por T3.»
**SEÑALA:** en la tarjeta del formato de trama, la parte resaltada «TAG 802.1Q». En la tabla, las filas de la VLAN 70 en ambos switches.
**Dilo con honestidad:** «los switches de GNS3 no filtran VLANs por trunk, así que la lista de cada trunk es el diseño, no una restricción del switch».

### Escena 6 — Inter-VLAN (≈ 2 min)
**Qué se ve:** la topología y un botón para lanzar un ping.
**TOCA:** **LANZAR PING PC-ADMIN → PC-DEV** y mira la esfera magenta recorrer el camino.
**DI:** «Cada VLAN es una subinterfaz 802.1Q del router, como eth0.10 o eth0.20, y el router es el gateway de la VLAN: esa es la frontera de capa 3. Cuando PC-ADMIN, en la VLAN 10, le hace ping a PC-DEV, en la 20, el paquete sube por el trunk, R-DIST1 lo enruta por OSPF hacia R-DIST2, y baja por la VLAN 20. Dos VLANs distintas no se hablan si no hay un router en medio.»
**SEÑALA:** el camino resaltado en verde y, en el cuadro de texto, el TTL 62: «el TTL baja cuando cruza un router».

### Escena 7 — OSPF y convergencia (≈ 2 min 30 s) ★ vale el 30 %
**Qué se ve:** la topología, botones de cortar y restaurar, y una consola con la ruta.
**TOCA:** primero mira el estado inicial (**RESTAURAR**). Luego **CORTAR ENLACE DIST1↔DIST2** y observa la línea roja y el paquete yendo por R-CORE. Después **RESTAURAR**.
**DI:** «Usamos OSPFv2 en el área cero con los router-IDs 1.1.1.1, 2.2.2.2 y 3.3.3.3. Con tres routers no hace falta dividir en áreas. Cada router anuncia las redes conectadas y forma adyacencias Full con sus vecinos: son seis adyacencias en OSPFv2 y otras seis en OSPFv3. Ahora cortamos el enlace directo entre los dos routers de distribución: la ruta a la VLAN 10 pasa de métrica dos, directa, a métrica tres, por R-CORE, y el ping sigue funcionando sin que hayamos tocado ninguna ruta. Eso es convergencia. Al restaurar el enlace, la adyacencia vuelve a formarse y se recupera el camino corto.»
**SEÑALA:** en la consola el cambio `[110/2]` → `[110/3]` y el TTL 62 → 61.
**Si preguntan:** «¿por qué un solo área?» → «la sesión 15 dice que varias áreas se usan cuando hay cientos de routers; aquí serían complejidad sin beneficio». «¿qué es el 110?» → «la distancia administrativa de OSPF».

### Escena 8 — IPv6 y SLAAC (≈ 2 min) ★ vale el 25 %
**Qué se ve:** un cuadro con una MAC editable y el paso a paso del EUI-64.
**TOCA:** en el campo de MAC, cambia algunos dígitos y mira cómo se recalcula todo. Usa `70:07:12:34:56:78`, la del ejemplo de la clase.
**DI:** «Usamos el prefijo 2001:db8:acad::/48. Solo las VLANs 10 y 20 tienen IPv6, que es el mínimo que pide el enunciado, más los tres enlaces entre routers, que OSPFv3 anuncia. IPv4 e IPv6 conviven en las mismas interfaces: eso es dual-stack. Los hosts no se configuran a mano: usan SLAAC. Reciben el prefijo del router en un mensaje RA y arman el resto con su MAC: insertan FF:FE en el medio, invierten el bit siete del primer byte y ya tienen su identificador de interfaz. Con eso forman la dirección link-local, la global, y hacen DAD para verificar que no esté repetida.»
**SEÑALA:** los pasos 2 y 3 (lo que se resalta en magenta).
**Dilo con honestidad (importante):** el recuadro inferior muestra las direcciones reales. En GNS3 el VPCS escribe `20` en vez de `02` en el primer byte, y por eso ves `2050:79ff:…` y no `0250:79ff:…`. «Es una particularidad del simulador; el método correcto es el de la animación.»

### Escena 9 — Invitados aislados (≈ 1 min 30 s)
**Qué se ve:** un interruptor de firewall y una tabla de tres pruebas.
**TOCA:** el botón **FIREWALL** para encender y apagar; los resultados cambian.
**DI:** «Tener una VLAN y una subred propias para los invitados no basta: si el router enruta entre ellas, los invitados llegan a las redes internas. Nos pasó en la primera corrida de pruebas, los invitados alcanzaban TI. Por eso en R-DIST1, que es donde está el gateway de la VLAN 80, pusimos una regla que descarta todo lo que entra por eth0.80 hacia 10.10.0.0/24. Es el "bloquear tráfico entre VLANs" del laboratorio de la sesión 14. Ojo: el ping a su propio gateway sigue funcionando, porque ese tráfico no se reenvía.»
**SEÑALA:** la fila «Su gateway» siempre en verde, y las otras dos en rojo al encender.
**Dilo con honestidad:** las diapositivas piden bloquear tráfico entre VLANs pero no muestran el comando; usamos la sintaxis de VyOS.

### Escena 10 — Pruebas (≈ 1 min)
**Qué se ve:** los 14 resultados y cuatro filtros.
**TOCA:** **IPv6**, luego **BLOQUEADAS**, luego **TODAS**.
**DI:** «Hicimos catorce pruebas y todas dieron lo esperado: doce deben responder y dos deben quedar bloqueadas. Las repetimos después de apagar todo y volver a abrir el proyecto, para comprobar que las configuraciones quedaron guardadas.»
**SEÑALA:** T05 y T06: «prueban que la VLAN 70 cruza el trunk entre switches». T11: «IPv6 entre dos redes distintas».

### Escena 11 — Troubleshooting (≈ 1 min 30 s) ★ vale el 15 %
**Qué se ve:** tres botones de fallas.
**TOCA:** **A**, **B** y **C** por orden.
**DI:** «Siempre seguimos el mismo método: capa uno, capa dos, capa tres. ¿Hay enlace? ¿Están en la misma VLAN? ¿Tienen ruta y gateway correcto? En la falla B, PC-COM llega a su gateway pero no a otra VLAN: ese síntoma, llegar al vecino pero no a otras redes, apunta a un gateway mal puesto, no a un cable ni a un switch.»
**SEÑALA:** en la B, las dos líneas de ping: «una responde y la otra no, y la diferencia es cruzar o no el router».

### Escena 12 — Límites y cierre (≈ 1 min)
**TOCA:** marca cada límite al mencionarlo.
**DI:** «Antes de que pregunten: los números de invitados, servidores, impresoras y Wi-Fi corporativo no venían en el enunciado, los supusimos y están marcados; cambian el VLSM, no el diseño. Los puntos de acceso no se emulan. Los trunks de GNS3 no filtran VLANs. Internet no se simula porque el segundo corte no lo pide. Y la subred de Comercial cubre el treinta por ciento sin reserva extra. Gracias, quedamos atentos a preguntas.»

---

## Si el profesor pide ver algo en vivo en GNS3

Enciende el proyecto `SabanaTech-Corte2`, espera unos 3 minutos y abre la consola de cada router (login `vyos` / `vyos`).

| Quiero mostrar… | Comando en el router |
|---|---|
| Vecinos OSPFv2 (deben estar en `Full`) | `show ip ospf neighbor` |
| Vecinos OSPFv3 | `show ipv6 ospfv3 neighbor` |
| Rutas aprendidas por OSPF | `show ip route ospf` |
| Rutas IPv6 | `show ipv6 route` |
| Interfaces y direcciones | `show interfaces` |
| Ruta hacia una red | `show ip route 10.10.0.96/27` |
| Camino real de un paquete | `traceroute 10.10.0.98` |
| Regla de aislamiento (solo R-DIST1) | `show configuration commands \| match firewall` |

En un host VPCS: `show ip`, `show ipv6`, `ping 10.10.0.66`. Para provocar la falla de convergencia: clic derecho sobre el enlace R-DIST1 ↔ R-DIST2 → *Suspend* (y *Resume* para restaurar).

## Contenido del repositorio

| Archivo | Qué es |
|---|---|
| `index.html` | La presentación (todo el código en un archivo) |
| `README.md` | Este guion |

El proyecto completo (documentación, scripts y evidencias) está en el equipo del grupo; este repositorio contiene solo la presentación.

---
*Última actualización: 2026-09-29.*
