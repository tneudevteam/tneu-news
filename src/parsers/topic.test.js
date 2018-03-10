const {getTopicFromSubtitle, getPrimaryTopic, getSecondaryTopic} = require('./topic');

describe('#getTopicFromSubtitle', () => {
  it('should export getTopicFromSubtitle function', () => {
    expect(getTopicFromSubtitle).toBeInstanceOf(Function);
  });

  it('should return empty string if subtopic is invalid', () => {
    const subtitle = '';
    const topic = getTopicFromSubtitle(subtitle);

    expect(topic).toEqual('');
  });

  it('should return full topic name from subtitle', () => {
    const subtitle = 'Дата: 7-03-2018, 15:52 Новини / Оголошення';
    const topic = getTopicFromSubtitle(subtitle);

    expect(topic).toEqual('Новини / Оголошення');
  });
});

describe('#getPrimaryTopic', () => {
  it('should export getPrimaryTopic function', () => {
    expect(getPrimaryTopic).toBeInstanceOf(Function);
  });

  it('should return empty string if topic is invalid', () => {
    const topic = '';
    const primaryTopic = getPrimaryTopic(topic);

    expect(primaryTopic).toEqual('');
  });

  it('should return primary topic name from full topic name', () => {
    const topic = 'Новини / Оголошення';
    const primaryTopic = getPrimaryTopic(topic);

    expect(primaryTopic).toEqual('Новини');
  });

  it('should return primary topic name from short topic name', () => {
    const topic = 'Новини';
    const primaryTopic = getPrimaryTopic(topic);

    expect(primaryTopic).toEqual('Новини');
  });
});

describe('#getSecondaryTopic', () => {
  it('should export getSecondaryTopic function', () => {
    expect(getSecondaryTopic).toBeInstanceOf(Function);
  });

  it('should return empty string if topic is invalid', () => {
    const topic = '';
    const secondaryTopic = getSecondaryTopic(topic);

    expect(secondaryTopic).toEqual('');
  });

  it('should return empty string if there is no secondary topic', () => {
    const topic = 'Новини';
    const secondaryTopic = getSecondaryTopic(topic);

    expect(secondaryTopic).toEqual('');
  });

  it('should return secondary topic name from full topic name', () => {
    const topic = 'Новини / Оголошення';
    const secondaryTopic = getSecondaryTopic(topic);

    expect(secondaryTopic).toEqual('Оголошення');
  });
});
