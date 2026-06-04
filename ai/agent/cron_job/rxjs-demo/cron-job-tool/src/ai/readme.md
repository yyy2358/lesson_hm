ai.controller.ts 把import get删掉就报错了
ai.service.ts

  if (toolName === 'query_user') {
          try {
            const result = await this.queryUserTool.invoke(toolCall.args);
            console.log(`Tool ${toolName} result:`, result);
            messages.push(
              new ToolMessage({
                content: result,
                name: toolName,
                tool_call_id: toolCallId,
              }),
            );
          } catch (error) {
            console.error(`Error calling tool ${toolName}:`, error);
            messages.push(
              new ToolMessage({
                content: `Error calling tool ${toolName}: ${error.message}`,
                name: toolName,
                tool_call_id: toolCallId,
              }),
            );
          }
        } else if (toolName === 'send_mail') {
          try {
            const result = await this.sendMailTool.invoke(toolCall.args);
            console.log(`Tool ${toolName} result:`, result);
            messages.push(
              new ToolMessage({
                tool_call_id: toolCallId,
                name: toolName,
                content: result,
              }),
            );
          } catch (error) {
            console.error(`Error calling tool ${toolName}:`, error);
            messages.push(
              new ToolMessage({
                content: `Error calling tool ${toolName}: ${error.message}`,
                name: toolName,
                tool_call_id: toolCallId,
              }),
            );
          }
        }