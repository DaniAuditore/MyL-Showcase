import re
import json

# Texto de entrada como un string largo, simula la entrada que procesarías
input_text = """
Agrupar.
• Mover las cartas de Aliado que están en Línea de Ataque a la Línea de Defensa
y las cartas de Oro en la Zona de Oro Pagado a la Reserva de Oro por efecto de
habilidades que permitan Agrupar cartas o durante la Fase de Agrupación de cada turno.
• En la Fase de Agrupación, las cartas se Agrupan de manera automática a menos
que algún efecto de carta o habilidad no lo permita.
• En el primer turno del juego, se salta la Fase de Agrupación.
Afectar.
• Los jugadores o cartas pueden ser afectados por efectos, entendiendo afectar
como modificar las facultades (la facultad de atacar, de agruparse, de utilizar una
habilidad o jugar una carta, etc) y/o las características de un jugador o una carta (el
coste, la Fuerza, su habilidad, su Raza, la Zona en la que se encuentra, etc.).
• Los jugadores se ven afectados cuando se les restringe a realizar una acción,
cuando se ven cartas de una de sus Zonas de Juego privadas, cuando reciben daño
directo o se les obliga a realizar una acción, etc. Los efectos que los hagan elegir
opciones libremente (nombrar una carta, decir un número, elegir alguna de sus cartas,
etc) no afectan al jugador.
• Si un efecto no especifica que Zonas de juego afecta, debe entenderse que su
alcance aplica solo a cartas en juego. La excepción a esta regla son las habilidades de
cancelación o que afecten efectos, como la prevención o redirección, las que pueden
afectar a cualquier habilidad sin importar la Zona en la que se encuentren ya que no
afectan a la carta sino al efecto o habilidad.
Anular.
• Es la acción de evitar que un Talismán se resuelva o que un Aliado, Arma o Tótem
entre en juego. Sólo se puede Anular una carta en el momento que es jugada y luego
de que se hayan pagado todos sus costes. Esa carta va directamente al Cementerio de
su dueño sin efecto (excepto casos especiales donde se especifique lo contrario).
• Aunque una carta sea Anulada, se considera jugada para los efectos del juego.
• Las cartas de Oro no se juegan, por lo tanto, nunca pueden ser Anulados.
Barajar.
• Es la acción de revolver tu Mazo Castillo. Se debe Barajar siempre que el Mazo Castillo
sea intervenido por efectos de cartas y habilidades que permitan buscar o mostrar cartas
en él.
• Hay efectos de cartas y habilidades que Barajan cartas en juego o en otras Zonas de
juego, en dicho caso, siempre son Barajadas en los Mazos Castillos de sus respectivos
dueños.
• Siempre que una o más cartas de un cementerio sean barajadas en el Mazo Castillo
de su dueño, estas deben ser mostradas al oponente para verificar qué cartas son.
• Puede ocurrir que un efecto haga Barajar 0 cartas, por ejemplo “pon una carta de ahí
en tu mano y Baraja el resto” cuando es sólo una carta, o Baraja hasta tres cartas y
Roba una carta” y el jugador decide Barajar 0. En esos casos, no se debe Barajar el
mazo a menos que se deba Barajar por otro motivo, como haber buscado en el Castillo
por ese mismo efecto o haber mostrado cartas del Castillo.
Botar.
• Los efectos de cartas que hacen referencia a “Botar” implican hacer daño al Castillo
del jugador afectado.
• Los efectos que hacen Botar cartas a ambos jugadores al mismo tiempo, deben
resolver completamente cada parte de su habilidad.
• Las cartas se “Botan” del tope del Mazo Castillo de una en una, por lo que si un efecto
de carta o habilidad permite Botar más cartas de las que tiene ese Mazo Castillo, se
resuelve en medida de lo posible.
Buscar.
• Los efectos o habilidades que permiten buscar una carta lo hacen generalmente en el
Castillo Cementerio o Mazo soporte de su dueño. Si una carta no indica en que Zona de
juego se debe realizar la búsqueda, esta se debe realizar en el Castillo del controlador
del efecto.
• Siempre que se busque una carta, esta va a la mano del controlador del efecto, a
menos que se especifique lo contrario.
• Siempre que se tenga que buscar una carta con características específicas, la carta
buscada debe mostrarse al oponente para poder verificar que la carta que fue buscada
cumple con las especificaciones requeridas.
• Buscar una carta es una acción que no hace objetivo, y por esto puede iniciarse una
búsqueda en una Zona de información reservada y fallar voluntariamente la búsqueda.
• Siempre que se busque una carta en un Castillo, ese Castillo debe ser barajado
posteriormente, se haya encontrado o no el objeto de búsqueda.
Cancelar.
• Las habilidades Disparadas o Activadas, pueden ser canceladas, lo que implica que
no se resolverá y quedará sin efecto. Todos los costos pagados para la utilización de
dicha habilidad no se recuperarán y la habilidad se considera utilizada. La cancelación
no afecta ni hace objetivo a la carta que es fuente de esa habilidad sino al efecto.
• En caso de que una habilidad se pueda activar múltiples veces en el mismo turno,
cancelarla una vez no impedirá que vuelva a activarse, a menos que se especifique lo
contrario. El coste alternativo y otras condiciones de juego son sólo una forma de jugar
una carta y no se trata de una habilidad que pueda ser cancelada.
• También hablamos de cancelar cuando se cancela un ataque, en cuyo caso los Aliados
atacantes vuelven a la Línea de Defensa pero se puede continuar con la Guerra de
Talismanes y posterior asignación de daño en la que el daño será 0.
Copia
• En la construcción del mazo, las copias de una carta son la cantidad de cartas con el
mismo nombre que se repiten en tu mazo. Normalmente se usa un máximo de tres
copias de cada carta con la excepción de los Oros sin habilidad (puedes usar cualquier
cantidad), las cartas únicas (sólo puedes tener una).
• Durante la construcción de un mazo, se consideran copias, todas las cartas que tengan
las mismas características de juego, es decir, nombre, Coste, Fuerza, habilidad y otras
características de juego, sin embargo, puede existir dos o más cartas con características
distintas que tengan el mismo nombre. En estos casos, debes elegir cuál de las
versiones ocuparás en tu mazo pero no podrás usar las dos cartas con el mismo nombre
en tu mazo.
• Durante el juego, es considerada una copia cada carta con el mismo nombre (incluida
la original). Es decir, una carta se ve a sí misma y a todas las demás cartas con su
mismo nombre como una copia de sí misma.
• Dos cartas con el mismo nombre se consideran copias de una misma carta, aunque
no coincidan en sus demás características de juego (tipo de carta, fuerza, coste,
habilidad, etc.).
• Cuando una carta sale del juego, se considera una copia distinta a la carta que estaba
en juego, independiente de si va a una zona pública o privada.
• Cuando una carta se convierte en una copia de otra, esa carta gana todas las
características de juego de la carta a la que copia (tipo de carta, nombre, fuerza base,
coste, habilidad, etc.). Las nuevas características reemplazan a las originales.
Condición.
• Una condición de juego son todos los requerimientos del estado de juego que se
necesitan para jugar una carta o utilizar una habilidad y de qué forma se juega o utiliza.
• Las condiciones, al igual que los costes, deben cumplirse a cabalidad y no
pueden ser canceladas ni cambiadas por un efecto de reemplazo. Lo que sí puede
ocurrir es que una condición que ya se encuentre cumplida no produzca un cambio en
el estado de juego. Por ejemplo, jugar desde el Destierro un Talismán que diga “Cuando
lo juegues, Destiérralo” o jugar en la Fase Final una carta que diga “Cuando lo juegues
pasa a tu Fase Final”.
• Si no se puede cumplir una condición, no se puede intentar jugar esa carta o
utilizar esa habilidad ya que el estado de juego no lo permite.
Controlador.
• Las cartas en Zonas dentro del juego tienen un controlador, que es el jugador
dueño de esa Zona. Una carta en la Línea de Defensa oponente es controlada por el
oponente, una carta en el Oro Pagado del oponente es controlada por el oponente, pero
una carta en el Cementerio oponente no es controlada por el oponente ya que no es
una zona dentro del juego.
• Al jugar una carta, esa carta entra bajo el control de quien la jugó (excepto tal
vez las Armas), a la Zona dentro del juego correspondiente a su tipo de carta. Cuando
una carta sale del juego, siempre va a zona fuera del juego correspondiente del dueño
de la carta, es decir del jugador que comenzó con esa carta en su Castillo.
• El controlador de un efecto es el jugador que utilizó la habilidad o jugó el
Talismán del que se desprende ese efecto.
Convertir.
• Convertir es un efecto de habilidades que transforma el tipo de una carta u otra
característica, por ejemplo, convertir un Tótem en un Aliado, permitiéndole comportarse
como el nuevo tipo de carta.
• Cuando una carta se convierte en otro tipo de carta, el nuevo tipo reemplaza a todos
los otros tipos anteriores (a menos que se especifique lo contrario).
• Una carta que se convierte en otro tipo de carta no pierde su habilidad, pero no podrá
utilizar sus habilidades que requieran que sea de un tipo diferente de carta.
• Si una carta sin Fuerza se convierte en Aliado y no se especifica su Fuerza, ese Aliado
se considera de Fuerza 0.
Coste.
• Un coste es un recurso a pagar para jugar una carta o utilizar una habilidad. Estos
recursos pueden ser cartas del Castillo, cartas del Cementerio, cartas en juego, carta
en la Mano, pagar Oros, etc.
• Coste de Oro: Es el número impreso en la esquina superior derecha de una carta y
representa la cantidad Oros necesarios para pagar el coste de dicha carta. En cualquier
Zona de juego y fuera de él, las cartas mantienen su coste impreso.
• Cuando una habilidad hace referencia al coste de una carta, éste se refiere al coste de
Oro de la carta.
• Coste Alternativo: Corresponde a una alternativa a pagar del coste de Oro de una
carta, se requiere realizar una acción específica en reemplazo del pago del coste de
Oro. Para efectos del juego, al pagar el coste alternativo, no se considera que la carta
fue jugada pagando su coste de oro.
• Si una carta será jugada usando su coste alternativo, aun así, los costes adicionales
deben ser pagados para poder jugar esa carta.
•Coste Adicional: El coste adicional no modifica el coste de Oro de una carta, sino que
fija un coste extra para la acción de jugar una carta, utilizar una habilidad u otra acción
de juego, pudiendo ser este coste una cantidad adicional de Oros a pagar o alguna
acción específica de juego. Los costes adicionales no hacen objetivo. En caso de que
el coste adicional sea a una acción como Robar o buscar cartas en un Castillo, esos
costes no se pagan en el paso B de utilizar esa habilidad sino en el E al momento de
realizar la acción. Si no se pueden pagar, no se realiza esa acción y el efecto se resuelve
en la medida de lo posible.
• Los costes deben poder pagarse exitosamente para intentar jugar una carta o utilizar
una habilidad, si un efecto de reemplazo o una prevención se aplica al coste de una
carta o la utilización de una habilidad, esa carta no puede jugarse o esa habilidad no
puede utilizarse.
• Las habilidades que modifiquen de alguna forma la cantidad de Oros a pagar al
momento de pagar una carta, ya sea generando un Oro extra o que un Oro cuente como
más de un Oro al pagar el coste de una carta, corresponden a habilidades continuas.
Por ejemplo: cuando utilices este Oro para pagar el coste de un Arma, genera un Oro
adicional para pagar esa Arma.
• Cuando una carta Reduce su coste o hace que cueste más o menos Oros, es una
Condición de Juego. Por ejemplo: Cuando juegues esta carta, te cuesta un Oro menos
por cada Aliado que Controles.
Daño.
• Daño Directo: Corresponde al daño que se hace a través del efecto de una carta y
siempre tiene la palabra “Botar” en su texto de juego.
• Daño de Combate: Corresponde al daño que realizan los Aliados durante el paso de
Asignación de Daño durante la Fase de Batalla Mitológica.
• En algunos casos, el daño debe ser enviado al Destierro. En estos casos, aunque las
cartas no sean enviadas al Cementerio, de todas formas, se considera el daño. Enviar
las cartas al Destierro reemplaza el Botar cartas, por lo que las cartas que pasan por
este daño nunca tocan el cementerio.
• Si una carta hace referencia a “Daño” sin especificar a cuál tipo de Daño corresponde,
se consideran ambos tipos de Daño, Daño Directo y Daño de Combate.
Descartar.
• Poner una carta de la mano en el Cementerio de su dueño. Sólo pueden ser
descartadas cartas que físicamente se encuentren en la mano de su dueño.
• Los efectos de cartas o habilidades que permitan Descartar más cartas de las que hay
en la mano del jugador afectado, se resuelven en medida de lo posible Descartando
todas las que pueda.
Desterrar.
• Enviar una carta desde cualquier zona de juego a la Zona de Destierro.
• Una carta en la Línea de Defensa, Línea de Ataque, Línea de Apoyo, Reserva de Oro
o Zona de Oro Pagado que es Desterrada, se considera que “Sale del juego”.
Algunos efectos permiten Desterrar cartas sin enviarlas a la Zona de Destierro. Esas
cartas pueden permanecer en determinados lugares mientras el efecto que la envió allí
siga vigente.
• Cuando una carta es Desterrada y puesta bajo otra carta, esa carta Desterrada se
ubica bajo la carta boca arriba y visible para todos los jugadores. Esa carta permanece
ahí mientras la carta bajo la que está Desterrada permanezca en juego.
• Las cartas Desterradas bajo otra carta no se considera para efectos o habilidades que
hagan referencia a cartas en la Zona Destierro.
• Cuando una carta sale del juego, todas las cartas que estén Desterradas bajo ella se
mueven a la Zona de Destierro de su dueño a menos que se indique lo contrario. Este
movimiento no considera que las cartas se Destierren nuevamente, sino que se mueven
desde bajo la carta a la Zona de Destierro.
• Las cartas de Oro son un tipo especial de carta que no se juega, se ponen directamente
en juego, por lo mismo, aunque una carta indique que “Puedes jugar esa(s) carta(s)
como si estuviera(n) en tu mano”, no se podrá jugar al tratarse de un Oro.
• Si un efecto indica que se deben Desterrar cartas de un Castillo, estas son siempre del
tope del Castillo a menos que se especifique lo contrario.
Destruir.
• Enviar una carta desde la Línea de Defensa, Línea de Ataque, Línea de Apoyo,
Reserva de Oro o Zona de Oro Pagado al Cementerio de su dueño.
• Una carta Destruida, se considera que “Sale del juego”.
Dueño.
• El dueño de una carta es el jugador que comenzó con esa carta en su Castillo.
• Las cartas sólo pueden ir a una Zona fuera del juego de su dueño, independiente de
quién la controlaba antes de salir del juego.
Efecto.
• El efecto es la acción producida por una habilidad resuelta o un Talismán resuelto si
es que no fue Anulada o cancelada.
• En general una habilidad o Talismán tiene un solo efecto, pero existen cartas que
especifican más de un efecto, ya sea eligiendo uno o más efectos o de forma
acumulativa según la cantidad de condiciones que se cumplan. En el caso de los
múltiples efectos, se paga un coste por jugar la carta y los costes asociados a cada
efecto si los hubiera, todo en el paso B de jugar una carta o utilizar una habilidad.
• Existen efectos que no indican a quién afectan, por ejemplo “Sólo se puede jugar un
Talismán por turno”. Esos efectos se entiende que afectan a cada jugador por separado,
es decir cada jugador sólo podría jugar un Talismán por turno, no uno entre todos.
Exhumar.
• Puedes jugar esta carta desde tu Cementerio pagando su coste. Si es un Talismán,
destiérralo. No se aplican los costes Alternativos al momento de pagar el coste de una
carta con Exhumar.
• Puedes al momento de pagar los costes para jugar una carta utilizando su habilidad
de Exhumar reducir su coste por alguna condición de juego que se lo permita.
• La habilidad de Exhumar, corresponde a una habilidad continua que permite a las
cartas jugarse desde el cementerio. En caso de los Talismanes, éstos se Destierran al
jugarse mediante la habilidad de Exhumar.
• Para jugar una carta con Exhumar, se deben respetar todos los tiempos normales para
jugar una carta de ese tipo (Fase de vigilia para Aliados, etc.).
• Una carta que se juega desde el Cementerio por la habilidad de Exhumar, puede ser
Anulada normalmente, sin embargo, se podrá volver a intentar jugarla de nuevo si el
controlador lo desea y puede pagar sus costes. Los Talismanes jugados con Exhumar,
se Destierran incluso si son Anulados.
• Los Aliados, Armas o Tótems que en su caja de habilidad dicen “Puedes jugar este
[Referencia] desde tu Cementerio pagando su coste”, también se consideran con
habilidad Exhumar.
• Los Talismanes que en su caja de texto dicen “Puedes jugar este Talismán desde tu
Cementerio pagando su coste, luego Destiérralo”, también se consideran con habilidad
Exhumar.
• Si un efecto o habilidad hace que una carta pueda ser jugada desde el cementerio de
un jugador, no significa que esa carta afectada se considere con habilidad Exhumar.
Fuerza.
• Número impreso en la esquina superior izquierda en las cartas de Aliado, representa
la cantidad de daño que asigna como daño al Mazo Castillo al atacar.
• Durante la Asignación de daño, los cálculos de daño se rigen por las siguientes reglas:
• Si el Aliado atacante tiene mayor Fuerza que el bloqueador, el Aliado bloqueador es
Destruido y la diferencia entre las Fuerzas de ambos Aliados es el daño que se asigna
al Mazo Castillo del jugador defensor.
• Si ambos Aliados tienen la misma Fuerza, los dos son Destruidos y el jugador defensor
no recibe daño.
• Si el Aliado bloqueador tiene mayor Fuerza que el atacante, el Aliado atacante es
Destruido y ningún Mazo Castillo recibe daño.
• Para efectos de cartas y habilidades, se considera como “Fuerza” de un Aliado en
juego, la suma de su Fuerza base (impresa en su icono de fuerza) y los modificadores
de Fuerza, ya sean positivos o negativos. Esta suma total representa la Fuerza del
Aliado en juego y es la referencia para resolver efectos de cartas o habilidades que
requieran verificar la Fuerza de un Aliado.
Furia.
• Este Aliado no necesita pasar por una Fase de Agrupación para ser declarado
Atacante.
• Habilidad que permite a un Aliado ser declarado atacante sin necesidad de haber
estado en juego desde la última Fase de Agrupación de su actual controlador.
• Si un Aliado con la habilidad de “Furia” cambia de controlador durante la Fase de
Vigilia, puede ser declarado atacante en la Batalla Mitológica del mismo turno.
Generar.
• Existen cartas que generan Oros por efectos. Estos Oros no son cartas físicas sino
Oros virtuales y son el primer Oro que se debe utilizar a la hora de pagar el coste de
una carta o habilidad, no se puede elegir pagar un coste moviendo un Oro desde la
Reserva al Oro pagado si se podría haber pagado ese coste con un Oro generado..
• Los Oros generados duran sólo por el turno en el que fueron generados a menos que
se especifique lo contrario, por lo que de no utilizarse esos Oros se pierden al final del
turno.
Hasta.
• Existen efectos que no indican un número específico sino “hasta” x cantidad. En esos
casos el controlador del efecto puede decidir cuántas cartas seleccionar pudiendo
incluso elegir 0. Si el jugador elige 0 para su efecto con “hasta”, se considera cumplido
en un 100% el efecto.
• En general las cartas elegidas, de ser mayor a 0, se eligen en el paso A donde se
hacen objetivo las cartas a afectar.
• Existen efectos que indican realizar una acción hasta que ocurra algo. Por ejemplo
mostrar cartas del tope del Castillo hasta mostrar un Aliado y un Oro. En esos casos, no
se puede comenzar a realizar la acción si no se puede terminar (por ejemplo si no hay
más Aliados en el mazo no se muestra nada). En este ejemplo, el primer Aliado que se
muestre y el primer Oro que se muestre serán los que cumplan el efecto.
Imbloqueable.
• Este Aliado no puede ser bloqueado.
Esta habilidad permite que un Aliado declarado atacante, no pueda ser bloqueado en
Batalla Mitológica, a excepción de efectos de cartas o habilidades que permitan su
bloqueo.
• Si un Aliado sin la habilidad de Imbloqueable declarado atacante que fue bloqueado
gana la habilidad de Imbloqueable durante la Guerra de Talismanes, éste sigue
considerándose bloqueado y se asigna el daño de manera normal, sin considerar que
sea Imbloqueable.
• Si un Aliado Imbloqueable declarado atacante pierde su habilidad de Imbloqueable
durante la Guerra de Talismanes, éste no puede ser bloqueado ya que el Paso de
Asignación de Bloqueadores es anterior a la Guerra de Talismanes y por lo tanto se
considera no bloqueado.
Indesterrable.
• Esta carta no puede ser Desterrada.
• Esta habilidad impide que una carta en juego sea Desterrada por efecto de cartas o
habilidades.
• Los efectos de cartas o habilidades que Destierran cartas “globalmente” como Bacanal
(Talismán C:4 Cuando juegues este Talismán, Destiérralo. Destierra todos los Aliados y
Tótem en juego.) Destierran en medida de lo posible todo lo que pueda ser Desterrado,
las cartas con la habilidad de Indesterrable, no son afectados durante la resolución de
estos efectos.
Indestructible.
• Esta carta no puede ser Destruida.
• Esta habilidad impide que una carta en juego sea Destruida por efecto de cartas o
habilidades y en caso de los Aliados, ser Destruidos durante la Asignación de Daño.
• Los efectos de cartas o habilidades que Destruyen cartas “globalmente”, Destruyen en
medida de lo posible todo lo que pueda ser Destruido, las cartas con la habilidad de
Indestructible, no son afectados durante la resolución de estos efectos.
Luego.
• Existen habilidades separadas por el conector Luego, por ejemplo “Destruye un Aliado,
Luego Roba una carta”. En esos casos se debe resolver lo que está antes del luego
para hacer lo segundo, si no se puede resolver en su totalidad tampoco se podrá realizar
lo que dice después del luego.
• Los efectos después de un Luego no hacen objetivo, ya que la elección de las cartas
que afectará puede depender de lo que ocurra con la parte del efecto que va antes del
luego.
• No se puede responder a acciones que ocurrirán después de un luego, ya que no se
sabe con certeza si ocurrirán realmente o no.
Mirar.
• Es la acción que realiza el propio jugador observando información de una zona de
juego privada sin que haya intervención de su oponente. Si su oponente muestra cartas
de una zona privada, no se considera que el jugador esté mirando cartas ya que mirar
se asocia a observar por acciones del propio jugador, no de su oponente.
• Las cartas se Miran una a una, por lo que las habilidades que hagan referencia a Mirar
se resuelven en medida de lo posible.
• Mirar es una acción que entrega información no pública, por lo que sólo el controlador
del efecto o habilidad puede tener acceso a esta información.
• Las cartas Miradas serán devueltas en el orden que el controlador del efecto estime
conveniente a la parte superior del Mazo Castillo respectivo, a menos que se indique lo
contrario.
Mostrar.
• Es la acción realizada por un jugador de proporcionar información de una zona de
juego privada a otros jugadores. Las cartas se muestran una a una, por lo que las
habilidades que requieran Mostrar una determinada cantidad de cartas, se resuelven en
medida de lo posible.
• Mostrar es una acción que entrega información pública, por lo que ambos, el
controlador del efecto o habilidad tanto como su oponente pueden tener acceso a esta
información.
• Mostrar se considera como intervenir el Castillo, por lo que, después de resolver el
efecto que te permitía mostrar las cartas debes barajar tu Castillo.
Mover.
• Mover una carta de una Zona de Juego a otra. Las cartas sólo pueden moverse en las
Zonas dentro del Juego del controlador de la carta, a menos que se especifique lo
contrario.
• No se puede seleccionar como objetivo de una habilidad que implique Mover a una
carta que ya se encuentre en la Zona de destino.
Objetivo.
• Algunas cartas y/o habilidades te permiten elegir, al momento de jugarlas, a qué
elementos del juego afectarán. Con elementos del juego nos referimos a: Cartas,
jugadores, Zonas de juego, habilidades, etc. Cuando puedes seleccionar o elegir cuál o
cuáles elementos afectar y cuáles no, se considera que esos elementos seleccionados
son Objetivos de esa carta o habilidad. Nombrar una carta no hace objetivo esa carta.
Un elemento que ha sido elegido por una carta o habilidad que pida seleccionar objetivos
se considera Objetivo incluso si es la única opción disponible para elegir (único objetivo
válido), ya que hacer Objetivo a un elemento del juego depende exclusivamente de que
la carta o habilidad fuente permita elegir entre distintas opciones.
Pagar.
• Mover Oros de la Reserva de Oros a la Zona de Oros Pagados, esta acción es
realizada para jugar cartas o activar habilidades que lo requieran.
• Siempre que se juega una carta desde cualquier zona, se requiere pagar todos sus
costes, a menos que se especifique lo contrario. Los costes adicionales siempre deben
ser pagados.
Portar.
• Se considera Portar un Arma cuando un Arma es o está anexada a un Aliado. Un Arma
anexada a un Aliado se considera Portada y el Aliado al que está anexada se considera
su Portador.
• Cuando una habilidad permite Portar un Arma en juego a un Aliado determinado, esa
Arma puede ser cambiada de portador (moverse del Aliado original y ser Portada a un
nuevo Aliado) o bien, ser anexada a un Aliado si es que no tenía portador.
• Si el arma está siendo jugada, se deben pagar todos los costes asociados y respetar
los momentos establecidos para hacerlo. Si el arma está en línea de apoyo, debe existir
un Portador Objetivo válido para utilizar su habilidad de Portarse.
• Existen efectos que portan Armas desde fuera del juego, en cuyo caso no se considera
que la carta esté siendo jugada y no se pagan sus costes, pero debe tener un portador
válido para entrar en juego.
• Si en algún momento un Arma que está o fuera a entrar en juego queda sin portador
válido, esa Arma es enviada al Cementerio.
Prevenir.
• Prevenir o evitar se entiende como impedir que se realice una acción de juego en
particular. En general la prevención se juega en respuesta a que fuera a ocurrir la acción,
pero también puede darse como una habilidad continua de prevención.
Redirigir.
• Es una acción que permite cambiar el objetivo inicial de un efecto dirigido. Para redirigir
el efecto debes hacerlo en el paso D de Jugar una Carta o en el Paso D de Utilizar una
Habilidad, específicamente como una Carta “En Respuesta”. De la misma manera,
debes mantener objetivos válidos. Cuando se redirige, no se puede volver a elegir el
mismo objetivo inicial.
• Al redirigir un efecto, solamente se elige un nuevo objetivo valido y en ningún momento
se toma el control del efecto, solo se cambia un objetivo del efecto.
• En el caso de que se redirija un talismán con dos o más objetivos, sólo se podrá
modificar uno de los mismos, permaneciendo los demás objetivos intactos.
Reducción de Daño.
• El daño de combate se asigna una sola vez, en un solo paso, sumando todo el daño
realizado por los aliados Atacantes.
• Cuando existe una reducción de daño, es el jugador defensor el que decide qué puntos
de daño son reducidos y de qué Aliados. La reducción siempre es respecto al total, y no
sobre una fuente en particular, salvo que se especifique lo contrario.
Robar.
• Tomar una carta del tope de un Mazo Castillo y ponerla en la mano.
• Los efectos de cartas o habilidades que permiten poner cartas del Mazo Castillo en la
mano de su dueño, no son considerados como Robar.
• Las cartas se Roban una a una, por lo que los efectos que permitan Robar más cartas
que las que quedan en un Mazo Castillo, se resuelven en medida de lo posible.
• La carta que se roba en la Fase de Robo por regla general, no se ve afectada por
efectos de cartas, a menos, que se especifique lo contrario.
• Los efectos que hacen Robar cartas a ambos jugadores al mismo tiempo deben
resolver completamente cada parte de su habilidad.
Resolver.
• Resolver una carta o habilidad se refiere al intento de realizar un cambio en el estado
de juego, no necesariamente con éxito. Cuando una carta o habilidad no fue anulada ni
cancelada respectivamente, esta se resuelve en el paso E) correspondiente de los
pasos para jugar una carta o utilizar una habilidad. Al resolver una carta o habilidad,
esta podría no cumplir su efecto o no poder poner en juego la carta que se está jugando,
sin embargo, esta carta se considera resuelta sin efecto en el estado de juego.
Subir.
• Enviar una carta desde una zona de juego o desde el Cementerio a la mano de su
dueño.
• Una carta Subida a la mano de su dueño desde una zona de juego (Línea de Ataque,
Línea de Defensa, Línea de Apoyo, Reserva de Oros o Zona de Oro pagado), se
considera que “Sale del juego”.
"""

# Función para procesar el texto
def process_sections(text):
    # Separar el texto en secciones basándose en los nombres de secciones que terminan en punto seguido por un salto de línea.
    parts = re.split(r'\.\n(?=[A-Z][a-z]+\.|\Z)', text.strip())
    sections = []
    id_counter = 1
    
    for part in parts:
        if part.strip():
            # Encuentra el primer punto para separar el nombre de la sección del contenido
            split_point = part.find('.')
            name = part[:split_point].strip()
            content = part[split_point + 1:].strip()
            
            # Ajustar el nombre quitando el punto final si está presente
            name = name[:-1] if name.endswith('.') else name
            
            # Guardar la sección en la lista de secciones
            sections.append({
                "id": id_counter,
                "name": name,
                "content": content
            })
            id_counter += 1

    return sections

# Procesar las secciones
processed_sections = process_sections(input_text)

# Convertir a JSON
json_output = json.dumps(processed_sections, indent=4)
print(json_output)

# Guardar en un archivo (Opcional)
with open('sections.json', 'w') as file:
    file.write(json_output)
