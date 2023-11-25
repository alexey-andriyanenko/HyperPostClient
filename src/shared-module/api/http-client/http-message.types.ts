export type ExtractParam<Path, NextPart> = Path extends `:${infer Param}`
  ? { [key in Param]: string } & NextPart
  : NextPart;

export type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, {}>;
