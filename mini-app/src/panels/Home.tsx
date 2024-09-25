import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
} from '@vkontakte/vkui';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  const generateImage = async (): Promise<string> => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random', {
        method: 'GET',
      });
  
      const data = await response.json();
      console.log('Сгенерированный URL изображения:', data.url); // Добавлено для отладки
      return data.message;
    } catch (error) {
      console.error('Ошибка при генерации изображения:', error);
      throw new Error('Не удалось сгенерировать изображение');
    }
  };

  const openStoryEditor = async (): Promise<void> => {
    try {
      const image_url = await generateImage()

      console.error(image_url)
      bridge
        .send('VKWebAppShowStoryBox', {
          background_type: 'image',
          url: image_url,
          attachment: {
            type: "url",
            text: 'go_to',
            url: 'https://example.com',
          },
        })
    } catch (error) {
      console.error('Ошибка при генерации изображения или публикации истории:', error)
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={openStoryEditor}>
            Generate image
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
