import _ from "lodash";

interface IAvatars {
  url: string
  keys: string[]
  names: string[]
}

export function getRandomAvatar(data:IAvatars): string[] {
  const url = data['url'];

  const newData = data['keys'].reduce((acc: any, key:string) => {
    const urlKey = url.replace('key', key);
    const res = data['names'].map((name) => urlKey.replace('name', name));
    return (acc = [...acc, res]);
  }, []);

  const oneArray = _.concat(...newData);

  return oneArray;
}