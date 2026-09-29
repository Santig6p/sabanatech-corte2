/* Contenido de la guía de sustentación. Lo usan index.html (página) y build_readme.js (README.md). */
const PARTES = {
  A: { t: 'Antes de empezar', c: '#ffb63d' },
  B: { t: 'Abrir el proyecto', c: '#3de2ff' },
  C: { t: 'Explicar la red', c: '#9dff5b' },
  D: { t: 'Demostrar que funciona', c: '#ff3df0' },
  E: { t: 'Cómo se hizo y por qué', c: '#b48cff' },
  F: { t: 'Si algo falla', c: '#ff4d6d' }
};

const STEPS = [
/* ================= A ================= */
{ id: 'a0', ph: 'A', t: 'Prepara el computador', min: '5 min antes',
  hacer: [
    'Conecta el cargador. Las máquinas virtuales gastan mucha batería.',
    'Cierra Chrome, Teams, Packet Tracer y todo lo que no uses: el portátil tiene 7,8 GB de RAM y con el proyecto encendido queda casi al límite.',
    'Abre **esta guía en tu celular** (o en otra pantalla). Así la lees mientras el computador muestra solo GNS3 al profesor.',
    'Comprueba que el portátil no se va a suspender: pon el brillo alto y desactiva el protector de pantalla.'
  ],
  di: '',
  nota: 'Si el profesor va a ver la pantalla, deja solo GNS3 abierto. Esta guía es solo para ti.' },

/* ================= B ================= */
{ id: 'b1', ph: 'B', t: 'Abre GNS3', min: '~1 min',
  hacer: [
    'En el **Escritorio** de Windows busca el ícono azul-verde con un camaleón que dice **GNS3** (está marcado en rojo en la captura).',
    'Haz **doble clic** sobre él.',
    'No abras VMware por separado: GNS3 lo hace solo.'
  ],
  di: 'Vamos a abrir el proyecto tal como quedó guardado, empezando desde cero, para demostrar que todo se puede reconstruir.',
  ver: [['p01_escritorio', 'El ícono «GNS3» del escritorio, marcado en rojo.']],
  nota: 'Si no ves el ícono: tecla Windows, escribe «GNS3» y pulsa Enter.' },

{ id: 'b2', ph: 'B', t: 'Espera a que arranque la GNS3 VM', min: '~1 min',
  hacer: [
    'Al abrir GNS3 aparece **sola** una ventana de VMware que dice «GNS3 VM - VMware Workstation». Es normal: **no la cierres**.',
    'Espera a que aparezca una pantalla azul que dice «GNS3 server version 2.2.61» y una IP (192.168.155.128). Eso significa que la máquina virtual ya está lista.',
    'Vuelve a GNS3: clic en su ícono de la barra de tareas (abajo). Si quieres, minimiza VMware con el guion «—» de la esquina superior derecha.'
  ],
  di: 'GNS3 tiene dos partes: la interfaz que vemos en Windows y un servidor que corre dentro de una máquina virtual en VMware. Los routers VyOS corren en esa máquina virtual.',
  ver: [['p03_vmware_vm', 'La ventana de VMware con la GNS3 VM arrancando. El guion de la esquina la minimiza.'], ['p04_vm_lista', 'Pantalla azul: la GNS3 VM está lista.']],
  nota: 'Toda la sesión anterior confirmó que esto pasa solo. No apagues ni pauses esa máquina virtual.' },

{ id: 'b3', ph: 'B', t: 'Elige el proyecto SabanaTech-Corte2', min: '~30 s',
  hacer: [
    'En GNS3 verás un cuadro llamado **Project**. Abajo, en «Open project», pulsa **Recent projects…**.',
    'Elige **1. SabanaTech-Corte2.gns3**.',
    'Mira el panel de la derecha («Servers Summary»): debe mostrar círculos **verdes** en «GNS3 VM» y en el equipo. Si dice «is starting», espera unos segundos.'
  ],
  di: '',
  ver: [['p02_dialogo_proyecto', 'El cuadro «Project»: arriba a la derecha el estado del servidor, abajo el botón de abrir proyectos.'], ['p05_proyectos_recientes', 'Recent projects → SabanaTech-Corte2.gns3.']],
  nota: 'Alternativa: en «Open a project from disk» busca C:\\Users\\ssaan\\GNS3\\projects\\06320af0-9383-40d2-973d-acc6edf8a3ba\\SabanaTech-Corte2.gns3' },

{ id: 'b4', ph: 'B', t: 'Enciende toda la red', min: '~3 min de espera',
  hacer: [
    'El proyecto se abre con todos los equipos **apagados** (cuadritos rojos).',
    'Pulsa el botón verde **▶ (Start/Resume all)** de la barra de herramientas.',
    'Confirma con **Yes** en «Are you sure you want to start all devices?».',
    'Todos los cuadritos pasan a verde. Los routers **tardan unos 3 minutos** en terminar de arrancar (la CPU de la GNS3 VM marca casi 100 % mientras tanto).'
  ],
  di: 'Estamos encendiendo los tres routers, los dos switches y los nueve computadores. Mientras terminan de arrancar les explico la red.',
  ver: [['p06_proyecto_apagado', 'Proyecto cargado, todo apagado. El botón ▶ está marcado.'], ['p07_confirmar_inicio', 'Confirmación: Yes.'], ['p08_nodos_encendidos', 'Todos los nodos en verde; la CPU de la VM alta indica que los routers están arrancando.']],
  nota: 'Aprovecha estos 3 minutos para el paso siguiente. No abras consolas todavía.' },

/* ================= C ================= */
{ id: 'c1', ph: 'C', t: 'Explica la topología (mientras arrancan)', min: '~2 min',
  hacer: [
    '**Señala con el cursor**, en este orden: R-CORE (arriba) → R-DIST1 (izquierda) → R-DIST2 (derecha) → ASW-1 y ASW-2 (los dos switches) → los hosts de abajo.',
    'Explica los colores de los enlaces con el dedo/cursor: los tres enlaces entre routers son enrutados; los que bajan a los switches son trunks; los de los hosts son puertos de acceso.',
    'Si quieres apoyo visual, abre en otra ventana la página de apoyo: **explicar.html** (trae el mismo diagrama interactivo).'
  ],
  di: 'La red tiene tres routers: R-CORE en el núcleo y dos de distribución, R-DIST1 y R-DIST2. Cada router de distribución se conecta por un cable a un switch de acceso; los dos switches también están unidos entre sí. De cada switch cuelgan los computadores, uno por VLAN. En total son ocho VLANs y el bloque 10.10.0.0/24 está repartido con VLSM. R-DIST1 es el gateway de las VLAN 10, 30, 60 y 80; R-DIST2 es el de la 20, 40, 50 y 70. Usamos tres routers porque el enunciado pide varios dispositivos de capa 3, y no más porque el portátil solo tiene 7,8 gigas de RAM.',
  ver: [['p09_topologia_encendida', 'La topología ya encendida, con los tres routers marcados.']],
  nota: 'Datos para tener a mano: VLAN 10 ADMIN, 20 DESARROLLO, 30 COMERCIAL, 40 TI, 50 SERVIDORES, 60 COMUN, 70 WIFI-CORP, 80 INVITADOS.' },

/* ================= D ================= */
{ id: 'd1', ph: 'D', t: 'Abre la consola de R-DIST1 e inicia sesión', min: '~1 min',
  hacer: [
    '**Doble clic sobre el ícono del router R-DIST1** en el diagrama (no sobre el texto).',
    'Se abre una ventana negra llamada **Solar-PuTTY** con una pestaña «R-DIST1». Si es la primera vez que la ves, es el terminal del router.',
    'Espera hasta ver la línea **R-DIST1 login:** (abajo). Si aún salen mensajes, el router no terminó de arrancar: espera un poco más.',
    'Escribe `vyos` y Enter. Luego, cuando pida Password, escribe `vyos` y Enter (no se ve al escribir).',
    'Verás «Welcome to VyOS!» y el prompt **vyos@R-DIST1:~$**.'
  ],
  cmd: ['vyos', 'vyos'],
  di: 'Cada router es un VyOS, un sistema de enrutamiento de código abierto. Entramos a su consola con el usuario y la clave por defecto.',
  ver: [['p09_consola_login', 'Pantalla de login de R-DIST1.'], ['p10_login_ok', 'Login correcto: «Welcome to VyOS!» y el prompt.']],
  nota: '**IMPORTANTE:** nunca escribas `clear` solo (VyOS dice «Incomplete command» y el terminal se comporta raro). Para limpiar la pantalla usa Ctrl+L. Escribe **despacio** y espera el prompt antes del siguiente comando: estos routers son lentos.' },

{ id: 'd2', ph: 'D', t: 'OSPF: los vecinos', min: '~1 min',
  hacer: [
    'En la consola de R-DIST1 escribe el comando y pulsa Enter.',
    'Mira la columna **State**: deben decir **Full** los dos vecinos (1.1.1.1 y 3.3.3.3).',
    '**Señala** con el cursor las dos líneas «Full» (marcadas en rojo en la captura).'
  ],
  cmd: ['show ip ospf neighbor'],
  di: 'Este comando lista los vecinos OSPF. R-DIST1 tiene dos: el 1.1.1.1, que es R-CORE, y el 3.3.3.3, que es R-DIST2. El estado Full significa que ya intercambiaron toda la información de la red y están sincronizados. Para que dos routers sean vecinos deben coincidir en área, en los temporizadores Hello y Dead y en la subred del enlace; aquí todos usan el área cero. Cada uno de los tres routers ve dos vecinos, así que en total son seis relaciones de vecindad.',
  ver: [['p11_ospf_vecinos', 'Dos vecinos en estado Full.']],
  nota: 'Si sale menos de 2 vecinos, espera 30 segundos y repite: aún están convergiendo.' },

{ id: 'd3', ph: 'D', t: 'OSPF: las rutas que aprendió', min: '~1 min',
  hacer: [
    'Escribe el comando.',
    'Fíjate en las líneas que empiezan con **O>*** (rutas aprendidas por OSPF) y en las que dicen «is directly connected» (redes propias).',
    '**Señala** la línea de **10.10.0.64/27** (la VLAN 20 de DESARROLLO): dice `[110/2] via 10.10.0.234, eth2`.'
  ],
  cmd: ['show ip route ospf'],
  di: 'Aquí están las rutas que R-DIST1 aprendió dinámicamente. La red 10.10.0.64/27, que es la VLAN de Desarrollo, no está en este router: la aprendió de R-DIST2 por OSPF, a través de la interfaz eth2, con costo 2. El 110 es la distancia administrativa de OSPF. No hay ninguna ruta estática en toda la red.',
  ver: [['p12_ospf_rutas', 'Rutas OSPF de R-DIST1; la de 10.10.0.64/27 va por eth2 con costo 2.']],
  nota: 'Si pregunta «¿y las rutas estáticas?»: no hay; todo lo anuncia OSPF.' },

{ id: 'd4', ph: 'D', t: 'IPv6: vecinos y rutas OSPFv3', min: '~1 min 30 s',
  hacer: [
    'Escribe el primer comando y **señala** los dos vecinos en Full.',
    'Escribe el segundo y **señala** la línea de **2001:db8:acad:20::/64**: es la VLAN 20 en IPv6, aprendida de R-DIST2.'
  ],
  cmd: ['show ipv6 ospfv3 neighbor', 'show ipv6 route ospfv3'],
  di: 'Lo mismo pero para IPv6 con OSPFv3: mismos vecinos, misma cantidad de vecinos. La red IPv6 de Desarrollo, 2001:db8:acad:20, también llegó por OSPF. Es dual-stack: cada interfaz tiene dirección IPv4 e IPv6 a la vez. Solo las VLAN 10 y 20 usan IPv6, que es el mínimo que pide el enunciado, más los tres enlaces entre routers.',
  ver: [['p13_ospfv3_vecinos', 'Vecinos OSPFv3 en Full.'], ['p14_ipv6_rutas', 'Rutas IPv6 aprendidas por OSPFv3.']],
  nota: 'El prefijo es 2001:db8:acad::/48 (el mismo del laboratorio de la sesión 18); cada VLAN usa un /64.' },

{ id: 'd5', ph: 'D', t: 'Inter-VLAN: las subinterfaces', min: '~1 min',
  hacer: [
    'Escribe el comando. (El `| no-more` evita que la lista se pagine; si algún día sale un `:` al final, pulsa **q**.)',
    '**Señala** las cuatro líneas **eth0.10, eth0.30, eth0.60 y eth0.80**: son las VLAN 10, 30, 60 y 80.',
    'Señala **eth0**: no tiene IP porque es el trunk físico hacia ASW-1.'
  ],
  cmd: ['show interfaces | no-more'],
  di: 'Este es el enrutamiento inter-VLAN. Por el único cable que va al switch ASW-1 viajan cuatro VLANs, y el router las separa con subinterfaces 802.1Q: eth0.10, eth0.30, eth0.60 y eth0.80. Cada subinterfaz es el gateway de su VLAN y tiene su propia dirección IPv4; la de la VLAN 10 además tiene IPv6. Esa es la frontera de capa 3: para pasar de una VLAN a otra el paquete tiene que subir al router.',
  ver: [['p15_interfaces', 'Las subinterfaces de R-DIST1, una por VLAN.']],
  nota: 'Diferencia VLAN vs subred: la VLAN separa en capa 2; la subred es el direccionamiento de capa 3. Aquí van 1 a 1.' },

{ id: 'd6', ph: 'D', t: 'Prueba entre VLANs desde un computador', min: '~1 min 30 s',
  hacer: [
    '**Doble clic** sobre el computador **PC-ADMIN** (abajo a la izquierda). Se abre otra pestaña en Solar-PuTTY.',
    'Escribe los comandos uno por uno (con el prompt **VPCS>**).',
    'El ping debe dar 3 respuestas con **ttl=62**. **Señala** el ttl.'
  ],
  cmd: ['show ip', 'ping 10.10.0.66', 'show ipv6'],
  di: 'PC-ADMIN está en la VLAN 10, con la IP 10.10.0.98. Le hago ping a 10.10.0.66, que es PC-DEV, en la VLAN 20: otra red, en otro switch y detrás de otro router. Responde. El TTL baja de 64 a 62 porque el paquete cruzó dos routers, R-DIST1 y R-DIST2. En IPv6, este computador obtuvo su dirección solo, por SLAAC: recibió el prefijo del router y construyó el resto con su dirección MAC.',
  ver: [['p23_host_pcadmin', 'Arriba la dirección IPv6 por SLAAC, en medio la IPv4, abajo el ping entre VLANs con ttl=62.']],
  nota: 'La dirección IPv6 del VPCS escribe «20» en vez de «02» en el primer byte (2050:79ff:…). Es una particularidad del simulador; el método estándar EUI-64 daría 0250:79ff:…' },

{ id: 'd7', ph: 'D', t: 'Invitados aislados por firewall', min: '~2 min',
  hacer: [
    'En la pestaña de **R-DIST1** escribe el primer comando y **señala** las líneas `action drop` y `inbound-interface name eth0.80`.',
    'Ahora abre el computador **WIFI-INV** (doble clic) y escribe los tres pings.',
    'El primero (su gateway) **responde**; el segundo y el tercero dan **timeout**. Señálalos.'
  ],
  cmd: ['show configuration commands | match firewall | no-more', 'ping 10.10.0.129', 'ping 10.10.0.178', 'ping 10.10.0.194'],
  di: 'Tener una VLAN y una subred propias para los invitados no basta: si el router enruta entre ellas, los invitados llegan a la red interna. En nuestra primera prueba pasaba exactamente eso. Por eso, en R-DIST1, donde está el gateway de la VLAN 80, pusimos una regla que descarta todo lo que entra por eth0.80 y va hacia 10.10.0.0/24. Este computador de invitados sí llega a su propio gateway, la .129, pero no a TI ni a Servidores: quedan bloqueados. Es el «bloquear tráfico entre VLANs» del laboratorio de la sesión 14.',
  ver: [['p16_firewall', 'La regla de firewall en R-DIST1.'], ['p24_invitados_bloqueados', 'Desde WIFI-INV: su gateway responde; TI y Servidores, bloqueados.']],
  nota: 'Sé honesto: las diapositivas piden bloquear tráfico entre VLANs pero no muestran el comando; usamos la sintaxis de VyOS.' },

{ id: 'd8', ph: 'D', t: 'Convergencia: tumba un enlace y mira cómo OSPF se recupera', min: '~4 min',
  hacer: [
    '**Antes de tumbar:** en la pestaña de R-DIST1 escribe `traceroute 10.10.0.66`. Son **2 saltos**: 10.10.0.234 (R-DIST2) y el destino.',
    'Vuelve a GNS3. Haz **clic derecho sobre la línea** que une R-DIST1 con R-DIST2 (la horizontal del medio) y elige **Suspend**. Aparece un ícono amarillo de pausa.',
    'Espera unos 10–20 segundos. En R-DIST1 escribe `show ip route 10.10.0.64/27`: ahora dice **metric 3** y sale por **10.10.0.225** (R-CORE).',
    'Escribe otra vez `traceroute 10.10.0.66`: ahora son **3 saltos** (pasa por R-CORE). Y el ping de PC-ADMIN a PC-DEV sigue funcionando.',
    '**Restaura:** clic derecho sobre el mismo enlace → **Resume**. En unos segundos vuelve el camino de 2 saltos.'
  ],
  cmd: ['traceroute 10.10.0.66', 'show ip route 10.10.0.64/27'],
  di: 'Ahora probamos qué pasa si falla un enlace. Con todo activo, para llegar de R-DIST1 a R-DIST2 hay un camino directo de dos saltos. Desconectamos ese cable. Sin tocar ninguna configuración, OSPF detecta la falla, recalcula, y la ruta cambia: ahora el costo es 3 y va por R-CORE. El traceroute muestra tres saltos y la comunicación no se interrumpe. Eso es convergencia, y por eso la topología tiene los tres enlaces entre routers y no solo un árbol. Al restaurar el enlace, la adyacencia vuelve a formarse y regresa el camino corto.',
  ver: [['p17_traceroute_normal', 'Antes: 2 saltos.'], ['p18_menu_enlace', 'Clic derecho sobre el enlace: aparece el menú (Suspend).'], ['p19_enlace_suspendido', 'El enlace suspendido (ícono amarillo de pausa).'], ['p20_ruta_alterna', 'Después: métrica 3 por 10.10.0.225 (R-CORE).'], ['p21_traceroute_alterno', 'Después: 3 saltos.'], ['p22_reanudar_enlace', 'Resume restaura el enlace.']],
  nota: 'Este es el paso que más vale (OSPF y convergencia = 30 % de la nota). Ensáyalo al menos dos veces.' },

{ id: 'd9', ph: 'D', t: 'Opcional: ver la etiqueta 802.1Q con Wireshark', min: '~3 min',
  hacer: [
    '**Solo si hay tiempo y el computador aguanta** (Wireshark gasta RAM extra).',
    'Clic derecho sobre el cable entre **R-DIST1 y ASW-1** (el vertical de la izquierda) → **Start capture** → deja «Ethernet» → **OK**. Se abre Wireshark.',
    'Vuelve al PC-ADMIN y lanza `ping 10.10.0.66`.',
    'En Wireshark pulsa cualquier paquete y despliega la fila **802.1Q Virtual LAN**: verás «ID: 20» o «ID: 30». Señálala.',
    'Al terminar: botón rojo ■ de Wireshark, cierra la ventana y elige «Salir sin guardar». Si Wireshark pregunta por actualizar: «Recordármelo más tarde».'
  ],
  cmd: ['ping 10.10.0.66'],
  di: 'Aquí vemos el trunk por dentro. Estamos capturando en el cable entre R-DIST1 y el switch. Cada trama lleva la etiqueta 802.1Q y ahí vemos el VLAN ID: 20, 30… Así es como un solo cable transporta varias VLANs sin mezclarlas. El laboratorio de la sesión 14 pedía justamente analizar el tráfico del trunk con Wireshark.',
  ver: [['p25_menu_captura', 'Start capture sobre el enlace.'], ['p26_dialogo_captura', 'Cuadro de captura: OK.'], ['p27_wireshark_8021q', 'Wireshark: la fila 802.1Q Virtual LAN muestra el VLAN ID.']],
  nota: 'Si el portátil se pone lento, salta este paso: no es obligatorio.' },

{ id: 'd10', ph: 'D', t: 'Apaga todo al terminar', min: '~1 min',
  hacer: [
    'En GNS3 pulsa el botón rojo **■ (Stop all)** y confirma con **Yes**.',
    'Cierra las consolas Solar-PuTTY y cierra GNS3 (la X de la esquina). La GNS3 VM se apaga sola al salir.'
  ],
  di: 'Apagamos toda la red. Toda la configuración quedó guardada dentro de cada router, así que al volver a encenderla todo regresa igual; lo comprobamos apagando y reabriendo el proyecto, y las catorce pruebas dieron lo esperado.',
  ver: [['p28_detener_todo', 'Stop all → Yes.']],
  nota: '' },

/* ================= E ================= */
{ id: 'e1', ph: 'E', t: 'Qué nos pedían y con qué herramientas', min: '~1 min',
  hacer: [],
  di: 'Las diapositivas del segundo corte pedían ocho cosas: VLSM, VLANs justificadas, trunks, inter-VLAN, varios dispositivos de capa tres, OSPF, IPv6 con dual-stack y GNS3 como plataforma. Usamos GNS3 con routers VyOS, exactamente como el laboratorio de la sesión 12, porque VyOS es un enrutador real de código abierto y admite todo lo pedido: subinterfaces, OSPFv2, OSPFv3 y anuncios de router para IPv6. La GNS3 VM corre en VMware porque los routers VyOS son máquinas QEMU y necesitan virtualización. Los switches son los de GNS3, que soportan puertos de acceso y trunks 802.1Q, y los computadores son VPCS, que consumen casi nada de memoria.',
  porque: [
    ['¿Por qué VyOS y no otro router?', 'Es el que usa el curso (sesión 12) y admite todo el temario sin licencias.'],
    ['¿Por qué solo 3 routers?', 'Es el mínimo que cumple «múltiples dispositivos de capa 3» y da una topología con camino alterno. El portátil tiene 7,8 GB de RAM: cada router usa 512 MB.'],
    ['¿Por qué VPCS para los computadores?', 'Consumen unos pocos MB, permiten ping, IPv6 automático y guardar la configuración.']
  ] },

{ id: 'e2', ph: 'E', t: 'Cómo se diseñó', min: '~2 min',
  hacer: [],
  di: 'Primero segmentamos: ocho VLANs, una por necesidad. Management y Finanzas comparten VLAN porque son las dos áreas administrativas; Servidores y Áreas comunes son recursos compartidos y van aparte; el Wi-Fi corporativo y el de invitados también. Luego direccionamos con VLSM sobre 10.10.0.0/24, que es el primer bloque del ejercicio tres de la sesión nueve. Aplicamos las reglas de la clase: ordenar de mayor a menor, sumar el treinta por ciento de crecimiento más una dirección para el gateway, y usar el bloque más pequeño que cabe. Después armamos la topología: dos routers de distribución y uno de núcleo, dos switches de acceso, y un tercer trunk entre los switches solo para la VLAN 70, porque el Wi-Fi corporativo cubre los dos pisos y su gateway está en R-DIST2. Por último, IPv6 con el prefijo 2001:db8:acad, solo en las VLAN 10 y 20, y OSPFv3 para anunciarlas.',
  porque: [
    ['¿Por qué esos tamaños?', 'Wi-Fi corporativo: 40 dispositivos → 52 con el 30 % → +1 gateway = 53 → necesita 62 hosts → un /26. Desarrollo: 18 → 24 → 25 → /27. Comercial: 10 → 13 → 14 → /28 (justo).'],
    ['¿Por qué números supuestos?', 'El enunciado no da los invitados, servidores, impresoras ni Wi-Fi corporativo. Los supusimos (20, 8, 3 y 40) y están marcados; si el profesor da otros, se recalcula el VLSM sin cambiar el diseño.'],
    ['¿Por qué las VLAN son 10, 20, 30…?', 'El enunciado no prescribe los números; usamos los mismos de los laboratorios del curso para que el diseño sea legible.'],
    ['¿Por qué un solo área OSPF?', 'Con 3 routers no hace falta dividir; la sesión 15 explica que las áreas múltiples son para redes grandes.'],
    ['¿Por qué solo VLAN 10 y 20 con IPv6?', 'Es el mínimo pedido («al menos dos áreas, en redes distintas») y no gastamos direcciones ni configuración de más.']
  ] },

{ id: 'e3', ph: 'E', t: 'Cómo se construyó', min: '~1 min 30 s',
  hacer: [],
  di: 'La red no se armó a clics: se construyó con scripts que hablan con la API de GNS3, así que se puede reconstruir igual cuantas veces se quiera. Un script crea el proyecto, los routers, los switches, los computadores y los enlaces. Otro configura cada router con comandos VyOS: subinterfaces con vif, direcciones IPv4 e IPv6, OSPF con las redes de cada router, el anuncio de router para SLAAC y la regla de firewall. Otro configura los computadores. Y otro ejecuta las catorce pruebas y guarda la evidencia. Todo quedó documentado en archivos de texto con el porqué de cada decisión.',
  porque: [
    ['¿Por qué scripts?', 'Reproducibilidad: si algo se daña, se reconstruye en minutos; y queda evidencia exacta de qué se configuró.'],
    ['¿Qué comandos de VyOS se usaron?', 'set interfaces ethernet eth0 vif 10 address …  ·  set protocols ospf area 0 network …  ·  set protocols ospfv3 interface … area 0  ·  set service router-advert interface eth0.10 prefix …  ·  set firewall ipv4 forward filter rule 10 …  ·  commit  ·  save'],
    ['¿Por qué commit y save?', 'commit aplica el cambio; save lo guarda en disco. Sin save se pierde al apagar.']
  ] },

{ id: 'e4', ph: 'E', t: 'Problemas que encontramos y cómo los resolvimos', min: '~1 min 30 s',
  hacer: [],
  di: 'Nos pasaron varias cosas que conviene contar. Los routers VyOS numeraban sus tarjetas de red en orden aleatorio, entonces la configuración fallaba porque eth0 no existía; lo resolvimos renombrando cada interfaz según su dirección MAC antes de configurar. La imagen base traía interfaces de una sesión anterior; hicimos una copia limpia. En la primera corrida de pruebas los invitados llegaban a la red interna y por eso agregamos la regla de firewall. Y al principio nuestro contador de pings solo reconocía respuestas IPv4 y marcaba fallido el IPv6 aunque funcionaba; lo corregimos y repetimos la corrida.',
  porque: [
    ['Interfaces en desorden', 'VyOS numera las NIC por detección; se renombran por MAC (ip link set … name ethN) y se fija hw-id con set interfaces ethernet ethN hw-id.'],
    ['Invitados llegaban a TI', 'Corrida base 12/12; con la regla, T07 y T14 quedan bloqueadas como se diseñó.'],
    ['Pruebas IPv6 marcadas como fallidas', 'El contador buscaba «bytes from» (IPv4) y no «icmp6_seq» (IPv6). Se corrigió y se repitió.'],
    ['Persistencia', 'Se apagó, cerró y reabrió el proyecto y se repitieron las 14 pruebas: 14/14 y 6 adyacencias OSPF por protocolo.']
  ] },

{ id: 'e5', ph: 'E', t: 'Lo que no hicimos (límites honestos)', min: '~1 min',
  hacer: [],
  di: 'Para terminar, lo que no hicimos y por qué. No simulamos los puntos de acceso Wi-Fi: los representamos con el puerto de acceso de la VLAN y un cliente. Los switches de GNS3 no filtran VLANs por trunk, así que la lista de VLANs de cada trunk es el diseño. No hay salida a Internet porque el segundo corte no la pide y las diapositivas no ven NAT. Los números de invitados, servidores, impresoras y Wi-Fi corporativo son supuestos. Y la subred de Comercial cubre el treinta por ciento de crecimiento sin reserva adicional.',
  porque: [
    ['Puntos de acceso', 'No se emulan en GNS3; se representan con puertos de acceso en VLAN 70/80.'],
    ['Trunks sin filtro', 'El switch de GNS3 deja pasar todas las VLANs por un dot1q.'],
    ['Internet', 'Fuera del alcance del segundo corte; no se vio NAT.']
  ] },

/* ================= F ================= */
{ id: 'f1', ph: 'F', t: 'Si algo falla en plena sustentación', min: 'referencia',
  hacer: [],
  tabla: [
    ['Escribo y no aparece nada, o sale «^M»', 'El router es lento y descarta lo que se teclea justo después del prompt.', 'Espera 5 segundos, no pulses Enter varias veces y vuelve a escribir. Si sigue, cierra esa pestaña de Solar-PuTTY y abre otra con doble clic en el router.'],
    ['`show ip ospf neighbor` muestra menos de 2 vecinos', 'El router aún está convergiendo, o falta encender algo.', 'Espera 30–60 s y repite. Comprueba que todos los nodos estén en verde.'],
    ['Solar-PuTTY muestra la consola en blanco', 'El router aún arranca.', 'Espera hasta ver «login:». Los routers tardan ~3 min.'],
    ['Un router no responde nunca', 'Poca memoria en el portátil.', 'Cierra programas (Chrome, Teams). Usa otro router para el comando; la mayoría de los `show` se pueden ver desde R-DIST1 o R-DIST2.'],
    ['GNS3 dice que el servidor no conecta ("GNS3 VM is starting" eterno)', 'La máquina virtual no arrancó.', 'Revisa que VMware siga abierto y la ventana «GNS3 VM» muestre la pantalla azul. Si no, cierra GNS3 y ábrelo de nuevo.'],
    ['Un ping que debería responder falla', 'La red aún no converge, o el router se reinició.', 'Repite tras 30 s. Si sigue, `show ip route` y `show ip ospf neighbor` en el router más cercano.'],
    ['Escribí `clear` y se trabó el terminal', 'En VyOS `clear` solo es un comando incompleto.', 'Cierra la pestaña y abre otra consola. Para limpiar pantalla usa Ctrl+L.'],
    ['El profesor quiere ver la configuración de un router', '—', '`show configuration commands | no-more` (todo) o `| match ospf` / `| match vif` para filtrar.']
  ],
  di: '', nota: 'Si el profesor introduce una falla: NO cambies nada al azar. Di qué capa sospechas (1 física, 2 VLAN, 3 red), qué comando lo confirma y qué esperas ver.' }
];

if (typeof module !== 'undefined') module.exports = { PARTES, STEPS };
