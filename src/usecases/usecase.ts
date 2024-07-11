export interface Usecase<InputDto, OutputDto>{
  execute(inputDto: InputDto): Promise<OutputDto>;
}