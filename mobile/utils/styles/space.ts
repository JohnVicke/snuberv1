export type SpaceProps = {
  margin?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  padding?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
};

export const space = (props: SpaceProps) => ({
  margin: props.margin || '',
  marginBottom: props.marginBottom || '',
  marginLeft: props.marginLeft || '',
  marginRight: props.marginRight || '',
  marginTop: props.marginTop || '',
  padding: props.padding || '',
  paddingBottom: props.paddingBottom || '',
  paddingLeft: props.paddingLeft || '',
  paddingRight: props.paddingRight || '',
  paddingTop: props.paddingTop || ''
});
