import {post, param, requestBody} from '@loopback/rest';
import {DocumentRepository} from '../repositories/';
import {Document, Template} from '../models/';
import {repository} from '@loopback/repository';

export class DocumentTemplatesController {
  constructor(
    @repository(DocumentRepository)
    protected documentRepository: DocumentRepository,
  ) {}

  @post('/documents/{docId}/templates')
  async createTemplate(
    @param.path.number('docId') docId: typeof Document.prototype.id,
    @requestBody() templateData: Template,
  ): Promise<Template> {
    return this.documentRepository.templates(docId).create(templateData);
  }
}
