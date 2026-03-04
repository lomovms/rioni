class Map {

	constructor() {
		this.map = $('[data-map]');
		this.initialize();
	}

	initialize() {
		var shops;

        var data = {
            "type": "FeatureCollection",
            "features": [
              {"type": "Feature", "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 1, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 2, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 3, "geometry": {"type": "Point", "coordinates": [55.744522, 37.616378]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 4, "geometry": {"type": "Point", "coordinates": [55.780898, 37.642889]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 5, "geometry": {"type": "Point", "coordinates": [55.793559, 37.435983]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 6, "geometry": {"type": "Point", "coordinates": [55.800584, 37.675638]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 7, "geometry": {"type": "Point", "coordinates": [55.716733, 37.589988]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 8, "geometry": {"type": "Point", "coordinates": [55.775724, 37.56084]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 9, "geometry": {"type": "Point", "coordinates": [55.822144, 37.433781]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 10, "geometry": {"type": "Point", "coordinates": [55.87417, 37.669838]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 11, "geometry": {"type": "Point", "coordinates": [55.71677, 37.482338]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 12, "geometry": {"type": "Point", "coordinates": [55.78085, 37.75021]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 13, "geometry": {"type": "Point", "coordinates": [55.810906, 37.654142]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 14, "geometry": {"type": "Point", "coordinates": [55.865386, 37.713329]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 15, "geometry": {"type": "Point", "coordinates": [55.847121, 37.525797]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 16, "geometry": {"type": "Point", "coordinates": [55.778655, 37.710743]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 17, "geometry": {"type": "Point", "coordinates": [55.623415, 37.717934]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 18, "geometry": {"type": "Point", "coordinates": [55.863193, 37.737]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 19, "geometry": {"type": "Point", "coordinates": [55.86677, 37.760113]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 20, "geometry": {"type": "Point", "coordinates": [55.698261, 37.730838]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 21, "geometry": {"type": "Point", "coordinates": [55.6338, 37.564769]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 22, "geometry": {"type": "Point", "coordinates": [55.639996, 37.5394]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 23, "geometry": {"type": "Point", "coordinates": [55.69023, 37.405853]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 24, "geometry": {"type": "Point", "coordinates": [55.77597, 37.5129]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 25, "geometry": {"type": "Point", "coordinates": [55.775777, 37.44218]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 26, "geometry": {"type": "Point", "coordinates": [55.811814, 37.440448]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 27, "geometry": {"type": "Point", "coordinates": [55.751841, 37.404853]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 28, "geometry": {"type": "Point", "coordinates": [55.627303, 37.728976]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 29, "geometry": {"type": "Point", "coordinates": [55.816515, 37.597163]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 30, "geometry": {"type": "Point", "coordinates": [55.664352, 37.689397]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 31, "geometry": {"type": "Point", "coordinates": [55.679195, 37.600961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 32, "geometry": {"type": "Point", "coordinates": [55.673873, 37.658425]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 33, "geometry": {"type": "Point", "coordinates": [55.681006, 37.605126]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 34, "geometry": {"type": "Point", "coordinates": [55.876327, 37.431744]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 35, "geometry": {"type": "Point", "coordinates": [55.843363, 37.778445]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 36, "geometry": {"type": "Point", "coordinates": [55.875445, 37.549348]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 37, "geometry": {"type": "Point", "coordinates": [55.662903, 37.702087]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 38, "geometry": {"type": "Point", "coordinates": [55.746099, 37.434113]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 39, "geometry": {"type": "Point", "coordinates": [55.83866, 37.712326]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 40, "geometry": {"type": "Point", "coordinates": [55.774838, 37.415725]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 41, "geometry": {"type": "Point", "coordinates": [55.871539, 37.630223]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 42, "geometry": {"type": "Point", "coordinates": [55.657037, 37.571271]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 43, "geometry": {"type": "Point", "coordinates": [55.691046, 37.711026]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 44, "geometry": {"type": "Point", "coordinates": [55.803972, 37.65961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 45, "geometry": {"type": "Point", "coordinates": [55.616448, 37.452759]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 46, "geometry": {"type": "Point", "coordinates": [55.781329, 37.442781]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 47, "geometry": {"type": "Point", "coordinates": [55.844708, 37.74887]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 48, "geometry": {"type": "Point", "coordinates": [55.723123, 37.406067]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},
              {"type": "Feature", "id": 49, "geometry": {"type": "Point", "coordinates": [55.858585, 37.48498]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}}
            ]
		}

		var city = [
            ['улица Смирновская, 4 строение 2',  55.7367, 37.7055],
        ];

        shops = data.features;

        $(document).ready(function() {
            ymaps.ready(function () {
                $('[data-map]').each(function (index, el) {
					let load = $(el).data('map');
					let status = false;

					if (load == '') status = true;

					Window.loadMap($(el), status, 'init');
				});

				$('[data-map-single]').each(function (index, el) {
					let load = $(el).data('map-single');
					let status = false;

					if (load == '') status = true;

					Window.loadMap($(el), status, 'initSingle');
				});
            });

			// Глобальная функция, чтобы можно было вызывать в других скриптах
			Window.loadMap = function loadMap(el, status, func) {
				if (status) {

					if (func == 'init') {
						init(el.attr('id'));
					}

					if (func == 'initSingle') {
						initSingle(el.attr('id'))
					}
				}
			}

            function init (id) {
                var centerLat = 0;
                var centerLon = 0;
                for (var i = 0; i < shops.length; i++) {
                    centerLat += parseFloat(shops[i].geometry.coordinates[0]);
                    centerLon += parseFloat(shops[i].geometry.coordinates[1]);
                }

                var map = new ymaps.Map(id, {
                    center: [
                        parseFloat(centerLat / shops.length),
                        parseFloat(centerLon / shops.length)
                    ],
                    zoom: 10,
                    controls: []
                    }, {
                    searchControlProvider: 'yandex#search',
                    yandexMapDisablePoiInteractivity: true
                });

                /*Кастомный зум*/
                var MyZoomLayout = ymaps.templateLayoutFactory.createClass(
                    '<div class="zoom-control">' +
                    '<div class="zoom-control__zoom-in">' +
                    '<button type="button" class="zoom-button zoom-button-in">' +
                    '<span class="zoom-button-icon zoom-control__zoom-in-icon"></span>' +
                    '</button>' +
                    '</div>' +
                    '<div class="zoom-control__zoom-out">' +
                    '<button type="button" class="zoom-button zoom-button-out">' +
                    '<span class="zoom-button-icon zoom-control__zoom-out-icon"></span>' +
                    '</button>' +
                    '</div>' +
                    '</div>', {

                        // Переопределяем методы макета, чтобы выполнять дополнительные действия
                        // при построении и очистке макета.
                        build: function () {

                            // Вызываем родительский метод build.
                            MyZoomLayout.superclass.build.call(this);

                            // Начинаем слушать клики на кнопках макета.
                            $('#' + id + ' .zoom-button-in').bind('click', ymaps.util.bind(this.zoomIn, this));
                            $('#' + id + ' .zoom-button-out').bind('click', ymaps.util.bind(this.zoomOut, this));
                        },

                        clear: function () {
                            // Снимаем обработчики кликов.
                            $('#' + id + ' .zoom-button-in').unbind('click');
                            $('#' + id + ' .zoom-button-out').unbind('click');

                            // Вызываем родительский метод clear.
                            MyZoomLayout.superclass.clear.call(this);
                        },

                        zoomIn: function () {
                            var map = this.getData().control.getMap();
                            // Генерируем событие, в ответ на которое
                            // элемент управления изменит коэффициент масштабирования карты.
                            map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
                        },

                        zoomOut: function () {
                            var map = this.getData().control.getMap();
                            map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
                        }
                    });

                var zoomControl = new ymaps.control.ZoomControl({
                    options: {
                        layout: MyZoomLayout,
                        float: 'none',
                        position: {
                            top: 'calc(50% - 32px)',
                            right: '20px'
                        }
                    }
                });
                map.controls.add(zoomControl);

                // Кастомный кластер
                var clusterIcons = [{
                        href: '',
                        size: [40, 40],
                        // Отступ, чтобы центр картинки совпадал с центром кластера.
                        offset: [-20, -20]
                    }];
                var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div class="balloon-item balloon__cluster"><span class="balloon__cluster-amount">$[properties.geoObjects.length]</span></div>');

                var MyIconContentLayoutHover = ymaps.templateLayoutFactory.createClass(
                    '<div class="balloon-item balloon__cluster balloon__cluster--hover"><span class="balloon__cluster-amount">$[properties.geoObjects.length]</span></div>');

                var clusterer = new ymaps.Clusterer({
                    clusterIcons: clusterIcons,
                    clusterIconContentLayout: MyIconContentLayout
                });

                // Ховер на кластер
                clusterer.events
                    .add('mouseenter', function (e) {
                        e.get('target').options.set({ clusterIconContentLayout: MyIconContentLayoutHover });
                    })
                    .add('mouseleave', function (e) {
                        e.get('target').options.set({ clusterIconContentLayout: MyIconContentLayout });
                    })

                var BalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
                    '<div class="balloon">\
                        <div class= "balloon__inner" >\
                            <h3 class="h3 balloon__title">\
                                ТРК Атриум\
                            </h3>\
                            <div class="metro balloon__metro">\
                                <div class="icon icon__metro">\
                                    <svg xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 14 10" height = "10" width = "14" fill = "#48b85e" >\
                                        <polygon points="9.869 0 7 5.36 4.131 0 0.867 8.706 0 8.706 0 9.901 4.543 9.901 4.543 8.706 3.781 8.706 4.725 5.99 7 10 9.275 5.99 10.219 8.706 9.457 8.706 9.457 9.901 14 9.901 14 8.706 13.133 8.706 9.869 0" />\
                                    </svg >\
                                </div>\
                                Курская\
                            </div>\
                            <div class="balloon__work-time">\
                                <span>В наличии</span>\
                                <div class="balloon__count" data-count="2">\
                                    <span></span>\
                                    <span></span>\
                                    <span></span>\
                                    <span></span>\
                                </div>\
                                <span>много</span>\
                            </div>\
                            <p class="balloon__address">\
                                Земляной вал ул., 33 (1 этаж, павильон 4-Б4)\
                            </p>\
                            <p>\
                                Пн—чт, вс — с 10:00 до 22:00;\
                                пт, сб — с 10:00 до 23:00\
                            </p>\
                            <p class="balloon__tell">\
                                +7 (495) 926-71-55\
                            </p>\
                            </div>\
                        <div class="link link--pink balloon__route">Как проехать</div>\
                        <div class="balloon__btn">\
                            <button class="button button-buy input js-selected-shop">Забронировать</button>\
                        </div>\
                    </div>\
                    '
                );

                var getPointOptions = function() {
                    // mark
                    return {
                        iconLayout: 'default#image',
                        iconImageHref: './assets/images/required/map-markers.png',
                        iconImageSize: [32, 32],
                        iconImageOffset: [-16, -16],
                        hideIconOnBalloonOpen: true,
                        balloonContentLayout: BalloonContentLayoutClass,
                        balloonPanelMaxMapArea: 0,
                        balloonMaxWidth: 315,
                        balloonMinWidth: 315,
                        balloonOffset: [-104, -10],
                        // fullAvailability: ''
                    };
                };

                var geoObjectsInit = [];
                for (let i = 0; i < shops.length; i++) {
                    var pointData = '';
                    var pointOptions = getPointOptions();
                    var type = shops[i].geometry.type;

                    if (type === 'Shop') {
                        pointOptions.iconImageHref = './assets/images/required/map-markers.png';
                    }
                    if (type === 'Post') {
                        pointOptions.iconImageHref = './assets/images/required/map-markers.png';
                    }
                    if (type === 'Point') {
                        pointOptions.iconImageHref = './assets/images/required/map-markers.png'
                    }
                    if (type === 'Asc') {
                        pointOptions.iconImageHref = './assets/images/required/map-markers.png'
                    }

                    pointOptions.name = type;
                    var mark = new ymaps.Placemark(shops[i].geometry.coordinates, pointData, pointOptions );

                    // наведение на пины
                    mark.events
                        .add('mouseenter', function (e) {
                            setIconPin(e, 'active');
                        })
                        .add('mouseleave', function (e) {
                            setIconPin(e);
                        });

                    // пины при открытии балуна
                    mark.events.add('balloonopen', function (e) {
                        var object = e.get('target');
                        var name = object.options.get('name');
                        var $balloon = $('[class*="-balloon "], [class$="-balloon"]');

                        if (name === 'Post') {
                            $balloon.addClass('balloon-post');
                        }
                        if (name === 'Point') {
                            $balloon.addClass('balloon-point');
                        }
                        if (name === 'Shop') {
                            $balloon.addClass('balloon-shop');
                        }
                        if (name === 'Asc') {
                            $balloon.addClass('balloon-service');
                        }
                        if (object.options.get('selected')) {
                            $balloon.addClass('balloon-selected-shop');
                        }

                        $(document).on('click', '.js-selected-shop', function () {
                            if (!object.options.get('selected')) {
                                object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                                object.options.set({ selected: true })
                                $balloon.addClass('balloon-selected-shop');
                            }
                        });
                    });

                    mark.events.add('balloonclose', function (e) {
                        setIconPin(e);
                    });

                    geoObjectsInit.push(mark);

                    clusterer.removeAll();
                    clusterer.add(geoObjectsInit)
                    map.geoObjects.add(clusterer);
                }

                //  Спозиционируем карту так, чтобы на ней были видны все объекты
                map.setBounds(clusterer.getBounds(), {
                    checkZoomRange: true
                });
			}

			function initSingle (id) {
				var markerSrc = 'assets/images/required/marker.svg';

				var map = new ymaps.Map(document.getElementById(id), {
                    center: [55.7367, 37.7055],
                    zoom: 17
				});

				for (var i = 0; i < city.length; i++) {
                    var myPlacemark = new ymaps.Placemark(
                    [city[i][1],city[i][2]] , {
                        iconContent: '<span class="map__marker"><img src="' + markerSrc + '">' + city[i][0] +'</span>'
                    }, {
                        iconImageHref: '',
                        iconImageSize: [23, 31],
                        iconImageOffset: [-11, -15]
                    });

                    map.geoObjects.add(myPlacemark);
                }
			}
        });

        // Dinamic set icon on map
        function setIconPin(target, state) {
            var object = target.get('target');
            var name = object.options.get('name');

            if(state === 'active') {
                switch (name) {
                    case 'Post':
                        object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                        break;
                    case 'Point':
                        object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                        break;
                    case 'Shop':
                        object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                        break;
                    case 'Asc':
                        object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                        break;
                }
                if (object.options.get('selected')) {
                    object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                }

            } else {
                switch (name) {
                    case 'Post':
                        object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                        break;
                    case 'Point':
                        object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                        break;
                    case 'Shop':
                        object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                        break;
                    case 'Asc':
                        object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                        break;
                }
                if (object.options.get('selected')) {
                    object.options.set({ iconImageHref: './assets/images/required/map-markers.png' });
                }
            }
		}
	}
}

new Map();
