type CreateTranslate3dStyle = (tx: string, ty: string) => string;
export var createTranslate3dStyle: CreateTranslate3dStyle = (tx, ty) => {
  return `translate3d(${tx}, ${ty}, 0px)`;
};
